'use server';

import { hashPassword, signJWT, validatePassword, verifyJWT } from '../helper';
import { connectDB } from '../mongoose/config';
import { User } from '../mongoose/models/user';
import { signIn, signOut, auth } from '../../../auth';
import uniqid from 'uniqid';
import {
  activateAccountSchema,
  changePasswordFormSchema,
  forgetPasswordSchema,
  newUserSchema,
  signinFormSchema,
} from '../schemas/auth';
import {
  compileActivationEmailTemplate,
  compilePasswordResetEmailTemplate,
  compileResetUserPasswordEmail,
  sendEmail,
} from '../mongoose/emailServices';
import { revalidatePath } from 'next/cache';

export async function signup(formData) {
  try {
    await connectDB();
    console.log('i got here');
    const user = await User.findOne({ email: formData.email });
    if (user) {
      return { ok: false, error: 'User already exist', errorType: 'other' };
    }
    console.log('i was successful');
    const hashedPassword = await hashPassword(formData.password);
    console.log('i was successful');
    const userObjectWithHashedPassword = {
      ...formData,
      password: hashedPassword,
    };

    const newUser = new User(userObjectWithHashedPassword);
    const savedUser = await newUser.save();
    const parsedSavedUser = JSON.parse(JSON.stringify(savedUser));
    const response = { ok: true, data: parsedSavedUser };
    return response;
  } catch (error) {
    return { ok: false, error: 'Something went wrong' };
  }
}

// export async function signup(formData) {
//   // 1. Validate input
//   const parsedData = newUserSchema.safeParse(formData);
//   if (!parsedData.success) {
//     const validationError = Object.fromEntries(
//       parsedData.error?.issues?.map((issue) => [
//         issue.path[0],
//         issue.message,
//       ]) || []
//     );
//     return { error: validationError, errorType: 'validationError' };
//   }

//   try {
//     await connectDB();

//     const { email, firstName, role } = parsedData.data;

//     // 2. Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return { ok: false, error: 'User already exists', errorType: 'other' };
//     }

//     // 3. Create temp password & hash it
//     const tempPassword = uniqid.time(); // Consider a stronger random string generator (e.g., crypto.randomBytes)
//     const hashedPassword = await hashPassword(tempPassword);

//     const userData = {
//       ...parsedData.data,
//       isAdmin: false,
//       password: hashedPassword,
//     };

//     // 4. Save user
//     const savedUser = await new User(userData).save();

//     // 5. Create activation token
//     const token = signJWT({ id: savedUser._id });
//     const activationUrl = `${process.env.AUTH}/account-activation/${token}`;

//     // 6. Prepare and send email
//     const emailBody = await compileActivationEmailTemplate({
//       name: firstName,
//       role,
//       email,
//       password: tempPassword,
//       url: activationUrl,
//       link: `${process.env.AUTH}/login`,
//     });

//     const emailResult = await sendEmail({
//       to: email,
//       subject: 'MSR - Activate Your Account',
//       body: emailBody,
//     });

//     if (!emailResult.successful) {
//       return {
//         ok: false,
//         error:
//           'Email delivery failed. Please ensure the email address is valid.',
//         errorType: 'other',
//       };
//     }

//     return { ok: true };
//   } catch (error) {
//     console.error('Signup Error:', error);
//     return { ok: false, error: 'Something went wrong', errorType: 'other' };
//   }
// }

export async function login(formData) {
  const parsedData = signinFormSchema.safeParse(formData);
  // If validation errors, map them into an object
  if (!parsedData.success) {
    const validationError = Object.fromEntries(
      parsedData.error?.issues?.map((issue) => [
        issue.path[0],
        issue.message,
      ]) || []
    );
    return { ok: false, errors: validationError, errorType: 'validationError' };
  }
  try {
    if (formData) {
      await signIn('credentials', {
        redirectTo: '/dashboard',
        ...formData,
      });
    }
  } catch (error) {
    if (error && error?.type?.includes('CredentialsSignin')) {
      return {
        ok: false,
        error: 'Invalid credentials',
        errorType: 'authError',
      };
    }

    throw error;
  }
  // redirect('/dashboard')
}

export async function logOut() {
  await signOut({ redirectTo: '/auth/login' });
}

export async function getCurrentUser() {
  const session = await auth();
  return session;
}

export async function activateUser(id, formData) {
  const parsedData = activateAccountSchema.safeParse(formData);
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }

  const verifiedToken = verifyJWT(id);
  try {
    await connectDB();
    const user = await User.findById(verifiedToken.id);

    if (!user) {
      return { ok: false, error: 'Account does not exist', errorType: 'other' };
    }

    if (user.isActivated) {
      return {
        ok: false,
        error: 'Account already activated',
        errorType: 'other',
      };
    }

    const isPasswordValid = await validatePassword(
      formData.defaultPassword,
      user.password
    );

    if (!isPasswordValid) {
      return { ok: false, error: 'Invalid password', errorType: 'other' };
    }

    const hashedPassword = await hashPassword(formData.newPassword);
    const updatedUser = await User.findByIdAndUpdate(
      verifiedToken.id,
      {
        $set: { password: hashedPassword, isActivated: true },
      },
      { new: true }
    );
    if (updatedUser) return { ok: true };
  } catch (error) {
    return { ok: true, error: 'Something went wrong!', errorType: 'other' };
  }
}

export async function forgetPassword(formData) {
  const parsedData = forgetPasswordSchema.safeParse(formData);
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }

  try {
    connectDB();
    const user = await User.findOne({ email: formData.email });
    if (!user) {
      return { ok: false, error: 'user does not exist', errorType: 'other' };
    }

    const encryptedUserId = signJWT(
      { id: user._id },
      { expiresIn: '900000ms' }
    );
    const resetPasswordUrl = `/auth/password-reset/${encryptedUserId}`;
    const body = compilePasswordResetEmailTemplate({
      name: user.firstName,
      url: resetPasswordUrl,
      link: `/auth/login`,
    });

    const sendEmailResult = await sendEmail({
      to: user.email,
      subject: 'MSR - Reset your Password',
      body,
    });
    if (sendEmailResult.successful) {
      return { ok: true };
    } else {
      return {
        ok: false,
        error: 'Something went wrong. Please ensure email is valid',
        errorType: 'other',
      };
    }
  } catch (error) {
    return { ok: false, error: 'Something went wrong', errorType: 'other' };
  }
}

export async function resetPassword(authToken, formData) {
  const parsedData = passwordSchema.safeParse(formData);
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }

  try {
    const newpassword = formData.password;
    const { id, expired } = verifyJWT(authToken);
    if (!id) {
      return { ok: false, error: 'user does not exist', errorType: 'other' };
    }

    await connectDB();
    const user = await User.findById(id);

    if (!user) {
      return { ok: false, error: 'user does not exist', errorType: 'other' };
    }

    const hashedPassword = await hashPassword(newpassword);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      { new: true }
    );
    if (updatedUser) {
      const { password, ...updatedUserWithoutPassword } = updatedUser;

      return {
        ok: true,
        data: JSON.parse(JSON.stringify(updatedUserWithoutPassword)),
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: 'Something went wrong. please try again',
      errorType: 'other',
    };
  }
}

export async function changePassword(email, formData) {
  const parsedData = changePasswordFormSchema.safeParse(formData);
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }

  try {
    await connectDB();
    const user = await User.findOne({ email });

    const isPasswordValid = await validatePassword(
      formData.existingPassword,
      user.password
    );

    if (!isPasswordValid) {
      return { ok: false, error: 'Invalid password', errorType: 'other' };
    }

    const hashedPassword = await hashPassword(formData.newPassword);
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    );
    if (updatedUser) return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'Something went wrong!', errorType: 'other' };
  }
}

export async function removeUser(id) {
  try {
    await connectDB();
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      revalidatePath('/dashboard/users');
      return { ok: true };
    } else {
      return { ok: false, error: 'something went wrong' };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'something went wrong' };
  }
}

export const getUser = async (email) => {
  connectDB();

  const user = await User.findOne({ email });
  return user;
};

export const getUsers = async () => {
  connectDB();

  try {
    const user = await User.find();
    const parsedUsers = JSON.parse(JSON.stringify(user));
    if (!!user) {
      return { ok: true, users: parsedUsers };
    } else {
      return { ok: false, users: null };
    }
  } catch (error) {
    console.log(error);
  }
};

export async function resetUserPassowrd(email) {
  try {
    await connectDB();

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return { ok: false, error: 'User does not exist', errorType: 'other' };
    }

    // 3. Create temp password & hash it
    const tempPassword = uniqid();
    //uniqid.time') // Consider a stronger random string generator (e.g., crypto.randomBytes)
    const hashedPassword = await hashPassword(tempPassword);
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    );

    // 6. Prepare and send email
    const emailBody = await compileResetUserPasswordEmail({
      name: updatedUser.firstName,
      password: tempPassword,
    });

    const emailResult = await sendEmail({
      to: email,
      subject: 'New MSR Account Password',
      body: emailBody,
    });

    if (!emailResult.successful) {
      return {
        ok: false,
        error: 'Email delivery failed.',
        errorType: 'other',
      };
    }

    return { ok: true };
  } catch (error) {
    console.error('Signup Error:', error);
    return { ok: false, error: 'Something went wrong', errorType: 'other' };
  }
}

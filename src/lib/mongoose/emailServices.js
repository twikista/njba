import nodemailer from 'nodemailer';
// import * as Handlebars from '../../node_modules/handlebars/dist/cjs/handlebars';
// import { activationTemplate } from './emailTemplates/activationEmail';
// import { resetPasswordEmailTemplate } from './emailTemplates/resetPasswordEmail';
import { render } from '@react-email/components';
// import { Email } from '@/components/Emails/Test';
// import ActivationEmailTemplate from '@/components/email-templates/AccountActivation';
import PasswordResetEmailTemplate from '@/components/email-templates/ResetPassword';
import ActivationEmailTemplate from '@/components/email-templates/AccountActivation';
import ResetUserPasswordEmailTemplate from '@/components/email-templates/ResetUserpassword';

export async function sendEmail({ to, subject, body, from }) {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    secure: true,
    auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
  });
  try {
    const sendMailresult = await transport.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: body,
    });
    // console.log('sendMailresult:', sendMailresult);
    if (sendMailresult?.accepted?.length > 0) return { successful: true };
  } catch (error) {
    console.log(error);
    return { successful: false };
  }
}

//Handlebars implementation
// export function compileActivationTemplate({
//   name,
//   email,
//   password,
//   url,
//   link,
// }) {
//   const template = Handlebars.compile(activationTemplate);
//   const htmlBody = template({ name, email, password, url, link });
//   return htmlBody;
// }

//React-email implementation
export function compileActivationEmailTemplate({
  name,
  url,
  link,
  role,
  password,
  email,
}) {
  const emailHtml = render(
    <ActivationEmailTemplate
      name={name}
      url={url}
      link={link}
      role={role}
      defaultPassword={password}
      email={email}
    />
  );
  //   const template = Handlebars.compile(activationTemplate);
  //   const htmlBody = template({ name, url, link });
  return emailHtml;
}

//Handlebars implementation
// export function compileResetPasswordEmailTemplate({ name, url, link }) {
//   const template = Handlebars.compile(resetPasswordEmailTemplate);
//   const htmlBody = template({ name, url, link });
//   return htmlBody;
// }

//React-email implementation
export async function compilePasswordResetEmailTemplate({ name, url, link }) {
  const emailHtml = await render(
    <PasswordResetEmailTemplate name={name} resetLink={url} link={link} />
  );
  return emailHtml;
}

// export async function compileReactEmail({ name, url, link }) {
//   const email = await render(Email({ name, url, link }))
//   return email
// }

export async function compileResetUserPasswordEmail({ name, password }) {
  const emailHtml = await render(
    <ResetUserPasswordEmailTemplate name={name} password={password} />
  );
  return emailHtml;
}

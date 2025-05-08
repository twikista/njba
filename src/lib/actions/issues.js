'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '../mongoose/config';
import { Article } from '../mongoose/models/article';
import { Issue } from '../mongoose/models/issue';
import { auth } from '../../../auth';
import { IssueFormSchema } from '../schemas/issues';
import mongoose from 'mongoose';
import { cache } from 'react';

export const getIssues = async (status = 'published') => {
  try {
    await connectDB();
    const issues = await Issue.find({ status }).sort({
      volume: -1,
      issueNumber: -1,
    });
    console.log(issues);
    return issues;
  } catch (error) {
    // console.log(error)
  }
};

export const getIssue = async (issueRef, options = null) => {
  try {
    await connectDB();
    const issue = await Issue.findOne({ ref: issueRef }, options).lean();

    // const json = JSON.stringify(issue)
    // const issueObject = JSON.parse(json)
    return issue;
  } catch (error) {
    // console.log(error)
  }
};

//create new issue
export const createIssue = async (formData) => {
  const user = await auth();
  const {
    user: { firstName, lastName },
  } = user;

  const parsedData = IssueFormSchema.safeParse(formData);
  console.log(formData);
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }
  const { issueNumber, issueYear, volume, issueType, issueTheme } =
    parsedData.data;
  const issueData = {
    issueType,
    issueTheme,
    issueNumber,
    volume,
    issueYear,
    ref: `volume-${volume}-issue-${issueNumber}`,
    issueTitle: `Vol. ${volume} No. ${issueNumber} (${issueYear})`,
    published: false,
    publishDate: new Date(String(issueYear)),
    addedBy: `${firstName} ${lastName}`,
  };

  try {
    await connectDB();
    const newIssue = new Issue(issueData);
    const savedIssue = await newIssue.save();
    if (savedIssue?._id !== null) {
      revalidatePath('/archive');
      revalidatePath('/dashboard/issues');
      return { ok: true };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'Something went wrong', errorType: 'other' };
  }
};

export async function updateIssue(id, formData) {
  const { data, error } = IssueFormSchema.safeParse(formData);
  if (error) {
    const validationError = handleServerSideValidationError(data);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }

  try {
    await connectDB();
    const currentIssue = await Issue.findById(JSON.parse(id));
    console.log('currentIssue to update:', currentIssue);
    if (!currentIssue) {
      return { ok: false, error: 'Issue not found', errorType: 'other' };
    }

    console.log('data:', data);
    const issueData = {
      // ...currentIssue,
      ...data,
      ref: `volume-${data.volume}-issue-${data.issueNumber}`,
      issueTitle: `Vol. ${data.volume} No. ${data.issueNumber} (${data.issueYear})`,
    };

    console.log('issueData:', issueData);

    const updatedIssue = await Issue.findByIdAndUpdate(
      { _id: currentIssue._id },
      issueData,
      {
        new: true,
      }
    );
    console.log('updatedIssue:', updatedIssue);
    if (updatedIssue._id === undefined) {
      console.log('updatedIssue:', updatedIssue);
      return { ok: false, error: 'Something went wrong', errorType: 'other' };
    }
    //update all articles associated wtih an issue

    revalidatePath('/dashboard/issues');
    revalidatePath('/archive');
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Something went wrong', errorType: 'other' };
  }
}

//send draft editorial board for authorization
export const submitIssueForPublishing = async (ref) => {
  try {
    await connectDB();
    const issueSubmittedForPublishing = await Issue.findOneAndUpdate(
      { ref: ref, status: 'draft' },
      {
        $set: {
          status: 'review',
        },
      },
      { new: true }
    );

    if (issueSubmittedForPublishing?._id) {
      revalidatePath(`/dashboard/issues/${issueSubmittedForPublishing?.ref}`);
      return { ok: true };
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' };
    }
  } catch (error) {
    // console.log(error)
  }
};

export const rejectRequestToPublishIssue = async (ref) => {
  // const date = new Date()
  try {
    await connectDB();
    const publishedIssue = await Issue.findOneAndUpdate(
      { ref: ref, status: 'review' },
      {
        $set: {
          status: 'draft',
        },
      },
      { new: true }
    );

    if (publishedIssue._id) {
      revalidatePath(`/dashboard/issues/${publishedIssue.ref}`);
      return { ok: true };
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' };
    }
  } catch (error) {
    console.log(error);
  }
};

//publish issue
export const publishIssue = async (issueRef, publishDate) => {
  const user = await auth();
  const session = await mongoose.startSession();

  try {
    await connectDB();

    // Start transaction
    session.startTransaction();

    const publishedIssue = await Issue.findOneAndUpdate(
      { ref: issueRef, status: 'draft' },
      {
        $set: {
          published: true,
          publishDate: new Date(publishDate),
          status: 'published',
          publishedBy: `${user.user?.firstName} ${user.user?.lastName}`,
        },
      },
      { new: true, session }
    );

    if (!publishedIssue?._id) {
      // Issue not found or not updated, abort transaction
      await session.abortTransaction();
      return {
        ok: false,
        error: 'Issue not found or already published',
        errorType: 'not_found',
      };
    }

    const publishedArticles = await Article.updateMany(
      { ref: issueRef },
      { $set: { published: true, publishDate: publishedIssue.publishDate } },
      { session }
    );

    if (!publishedArticles.acknowledged) {
      // Problem updating articles, abort transaction
      await session.abortTransaction();
      return {
        ok: false,
        error: 'Failed to update articles',
        errorType: 'other',
      };
    }

    // If we reach here, both operations were successful, commit the transaction
    await session.commitTransaction();

    // Revalidate paths after successful transaction
    revalidatePath(`/dashboard/issues/${publishedIssue.ref}`);
    revalidatePath(`/dashboard/issues`);
    revalidatePath(`/archive`);

    return { ok: true };
  } catch (error) {
    // Any error occurred, abort transaction
    await session.abortTransaction();
    console.error('Transaction failed:', error);
    return { ok: false, error: error.message, errorType: 'transaction_failed' };
  } finally {
    // End session in all cases
    await session.endSession();
  }
};

export const getPublishedIssues = async () => {
  try {
    await connectDB();
    const publishedIssues = await Issue.find({ published: true }).sort({
      volume: -1,
      issueNumber: -1,
    });
    return publishedIssues;
  } catch (error) {
    console.log(error);
  }
};

export async function deleteIssueWithArticles(id) {
  console.log('Attempting to delete issue with ID:', id);

  // Ensure the database connection
  await connectDB();

  const session = await mongoose.startSession(); // Start a session for the transaction

  try {
    session.startTransaction(); // Start the transaction

    // Find and delete the issue
    const deletedIssue = await Issue.findByIdAndDelete(id, { session });

    if (!deletedIssue) {
      await session.abortTransaction(); // Abort transaction if issue not found
      console.error('Issue not found.');
      return { ok: false, message: 'Issue not found.' };
    }

    // Delete all associated articles
    const deleteOutcome = await Article.deleteMany(
      { ref: deletedIssue.ref },
      { session }
    );

    if (
      deletedIssue.articles.length > 0 && // If articles are associated
      deleteOutcome.deletedCount === 0 // And no articles were deleted
    ) {
      await session.abortTransaction(); // Abort transaction if article deletion fails
      console.error('Failed to delete associated articles.');
      return { ok: false, message: 'Failed to delete associated articles.' };
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();

    // Revalidate paths for updated pages
    revalidatePath('/archive');
    revalidatePath('/dashboard/issues');

    console.log('Issue and associated articles successfully deleted.');
    return { ok: true, message: 'Issue and articles deleted successfully.' };
  } catch (error) {
    // Abort transaction in case of any error
    await session.abortTransaction();
    console.error('An error occurred during the transaction:', error);
    return { ok: false, message: 'An error occurred during deletion.' };
  } finally {
    session.endSession(); // End the session
  }
}

export async function deleteIssueWithNoArticles(id) {
  console.log(id);
  try {
    await connectDB();
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!!deletedIssue) {
      revalidatePath('/archive');
      revalidatePath('/dashboard/issues');
      return { ok: true };
    } else {
      return { ok: false };
    }
  } catch (error) {
    console.log(error);
  }
}

// Server action to fetch archive data
export const getArchive = cache(async () => {
  try {
    await connectDB();
    const archive = await Issue.find({ published: true })
      .sort({ volume: -1, issueNumber: -1 })
      .limit(4);
    return archive;
  } catch (error) {
    console.error('Error fetching archive:', error);
    return [];
  }
});

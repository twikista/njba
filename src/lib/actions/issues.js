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
    return issues;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

//create new issue
export const createIssue = async (formData) => {
  const user = await auth();
  const {
    user: { firstName, lastName },
  } = user;

  const parsedData = IssueFormSchema.safeParse(formData);
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }

  console.log('parsedData', parsedData);
  const { issueNumber, issueYear, issueMonth, volume, issueType, issueTheme } =
    parsedData.data;

  const issueData = {
    issueType,
    issueTheme,
    issueNumber,
    volume,
    issueYear,
    issueMonth,
    ref:
      issueType === 'regular-issue'
        ? `volume-${volume}-issue-${issueNumber}`
        : `volume-${volume}-${issueNumber}`,
    issueTitle:
      issueType === 'regular-issue'
        ? `Vol. ${volume} No. ${issueNumber} (${issueYear})`
        : `Vol. ${volume}, Special Issue (${issueYear})`,
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
    if (!currentIssue) {
      return { ok: false, error: 'Issue not found', errorType: 'other' };
    }

    const { issueType, issueNumber, issueYear, volume, issueMonth } = data;
    const issueData = {
      // ...currentIssue,
      ...data,
      ref:
        issueType === 'regular-issue'
          ? `volume-${volume}-issue-${issueNumber}`
          : `volume-${volume}-${issueNumber}`,
      issueTitle:
        issueType === 'regular-issue'
          ? `Vol. ${volume} No. ${issueNumber} (${issueYear})`
          : `Vol. ${volume} Special Issue (${issueYear})`,
    };

    const updatedIssue = await Issue.findByIdAndUpdate(
      { _id: currentIssue._id },
      issueData,
      {
        new: true,
      },
    );

    if (updatedIssue._id === undefined) {
      console.log(`Issue not found ${currentIssue?.issueNumber}`);
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
      { new: true },
    );

    if (issueSubmittedForPublishing?._id) {
      revalidatePath(`/dashboard/issues/${issueSubmittedForPublishing?.ref}`);
      return { ok: true };
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' };
    }
  } catch (error) {
    console.log(error);
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
      { new: true },
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

  if (!user?.user) {
    return {
      ok: false,
      error: 'You must be logged in to publish an issue.',
    };
  }

  const date = new Date(publishDate);

  if (!publishDate || Number.isNaN(date.getTime())) {
    return {
      ok: false,
      error: 'Please provide a valid publication date.',
    };
  }

  let session;

  try {
    await connectDB();

    // Start transaction
    session = await mongoose.startSession();

    await session.withTransaction(async () => {
      const issue = await Issue.findOneAndUpdate(
        { ref: issueRef, status: 'draft' },
        {
          $set: {
            published: true,
            publishDate: date,
            status: 'published',
            publishedBy:
              `${user.user.firstName ?? ''} ${user.user.lastName ?? ''}`.trim(),
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!issue?._id) {
        throw new Error('ISSUE_NOT_FOUND');
      }

      await Article.updateMany(
        { ref: issueRef },
        {
          $set: {
            published: true,
            publishDate: issue.publishDate,
          },
        },
        { session },
      );
    });

    // Revalidate paths after successful transaction
    revalidatePath(`/dashboard/issues/${issueRef}`);
    revalidatePath(`/dashboard/issues`);
    revalidatePath('/');
    revalidatePath(`/archive`);
    revalidatePath('/sitemap.xml');
    revalidatePath('/current');

    return { ok: true };
  } catch (error) {
    // Any error occurred, abort transaction
    console.error('Publish issue failed:', error);

    if (error.message === 'ISSUE_NOT_FOUND') {
      return {
        ok: false,
        error: 'Issue not found or already published.',
        errorType: 'not_found',
      };
    }

    return {
      ok: false,
      error: 'Unable to publish the issue. Please try again.',
      errorType: 'transaction_failed',
    };
  } finally {
    // End session in all cases
    if (session) {
      await session.endSession();
    }
  }
};

export const getPublishedIssues = async () => {
  try {
    await connectDB();
    const publishedIssues = await Issue.find({ published: true }).sort({
      publishDate: -1,
      volume: -1,
      issueNumber: -1,
    });
    return publishedIssues;
  } catch (error) {
    console.log(error);
  }
};

export async function deleteIssueWithArticles(id) {
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
      { session },
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
      .sort({ publishDate: -1, volume: -1, issueNumber: -1 })
      .limit(4);
    return archive;
  } catch (error) {
    console.error('Error fetching archive:', error);
    return [];
  }
});

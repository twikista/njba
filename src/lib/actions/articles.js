'use server';

import { revalidatePath } from 'next/cache';
import { handleServerSideValidationError } from '../helper';
import { Article } from '../mongoose/models/article';
import { Issue } from '../mongoose/models/issue';
import { articleSchemaForServer } from '../schemas/issues';
import { connectDB } from '../mongoose/config';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';
import { removePdfFromStorage } from '../firebase/services';
import { cache } from 'react';
import { auth } from '../../../auth';
import { deleteFile } from '../r2/servicesActions';

export const getArticle = cache(async (slug, options = null) => {
  try {
    await connectDB();

    const article = await Article.findOne(
      {
        ref: `${slug.issue}`,
        slug: `${slug.article}`,
      },
      options
    );

    if (!article) {
      return null;
    }

    return article;
  } catch (error) {
    console.error('Error fetching article:', error.message);
    return {
      ok: false,
      error: 'Failed to fetch article. Please try again.',
      errorType: 'other',
    };
  }
});

export const getArticlesInIssue = async (issue, sorted = true) => {
  await connectDB();
  if (sorted) {
    const articlesInIssue = await Article.find({
      ref: `${issue}`,
      published: true,
    }).sort({
      startPage: 1,
    });
    return articlesInIssue;
  }
  const articlesInIssue = await Article.find({
    ref: `${issue}`,
    published: true,
  });
  return articlesInIssue;
};

export const getAllPublishedArticles = async () => {
  const publishedArticles = await Article.find({ published: true });
  return publishedArticles;
};

export const getArticlesInCurrentIssue = async () => {
  try {
    await connectDB();

    const [latestIssue] = await Issue.find({
      published: true,
      status: 'published',
    })
      .sort({ volume: -1, issueNumber: -1 })
      .limit(1);

    if (!latestIssue) {
      return {
        currentIssue: null,
        articlesInCurrentIssue: [],
      };
    }

    const articlesInCurrentIssue = await Article.find({
      ref: latestIssue.ref,
    }).sort({
      startPage: 1,
    });

    return {
      currentIssue: latestIssue,
      articlesInCurrentIssue,
    };
  } catch (error) {
    console.error('Error fetching current issue articles:', error);
    return {
      currentIssue: null,
      articlesInCurrentIssue: [],
    };
  }
};

export async function createArticle(formData, url, params) {
  const user = await auth();
  // Validate form data from frontend
  const { data, error } = articleSchemaForServer.safeParse(formData);
  if (error) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }

  const { pdfFile, ...articleData } = data;

  // Add computed fields to article object
  articleData.pdfUrl = url;
  articleData.slug = `${articleData.startPage}-${articleData.endPage}`;
  articleData.ref = `volume-${articleData.volume}-issue-${articleData.issue}`;
  articleData.published = params.published ? true : false;
  articleData.publishDate = new Date(params.publishDate);
  articleData.addedBy = user.user?.firstName + ' ' + user.user?.lastName;

  // Ensure database connection
  await connectDB();

  // Start a session for the transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); // Start the transaction

    // Create new article within transaction
    const newArticle = new Article(articleData);
    const savedArticle = await newArticle.save({ session });

    if (!savedArticle?._id) {
      // Explicitly abort the transaction if article creation fails
      await session.abortTransaction();
      return {
        ok: false,
        error: 'Failed to create article',
        errorType: 'other',
      };
    }

    // Update issue with new article ID within the same transaction
    const issueUpdateResult = await Issue.updateOne(
      {
        volume: `${savedArticle.volume}`,
        issueNumber: `${savedArticle.issue}`,
      },
      { $push: { articles: savedArticle._id } },
      { session }
    );

    if (
      !issueUpdateResult.acknowledged ||
      issueUpdateResult.modifiedCount !== 1
    ) {
      // Explicitly abort the transaction if issue update fails
      await session.abortTransaction();
      return { ok: false, error: 'Failed to update issue', errorType: 'other' };
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();

    // Revalidate routes affected by article creation to reflect changes
    revalidatePath(`/archive/${savedArticle.ref}`);
    revalidatePath(`/dashboard/issues/${savedArticle.ref}`);

    // Send success response back to the client
    return { ok: true, articleId: JSON.stringify(savedArticle._id) };
  } catch (error) {
    console.error('Transaction error:', error);
    return { ok: false, error: 'Something went wrong', errorType: 'other' };
  } finally {
    session.endSession(); // End the session
  }
}

export async function deleteArticle(id) {
  let ref = null;
  // Ensure database connection
  await connectDB();

  const session = await mongoose.startSession(); // Start a session for the transaction

  try {
    session.startTransaction(); // Start the transaction

    // Find and delete the article
    const deletedArticle = await Article.findByIdAndDelete(id, { session });

    if (!deletedArticle || !deletedArticle._id) {
      return { ok: false, error: 'Something went wrong', errorType: 'other' };
    }

    // Update the related issue to remove the article reference
    const issueUpdateResult = await Issue.updateOne(
      { ref: deletedArticle.ref },
      { $pull: { articles: deletedArticle._id } },
      { session }
    );

    if (issueUpdateResult.matchedCount === 0) {
      return { ok: false, error: 'Something went wrong', errorType: 'other' };
    }

    // Remove the PDF file from storage
    // await removePdfFromStorage(deletedArticle.pdfUrl);
    const key = deletedArticle.pdfUrl.split('/').at(-1);
    const deleted = await deleteFile(key);
    if (!deleted.success) {
      return { ok: false, error: 'Something went wrong', errorType: 'other' };
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();

    // Revalidate affected paths to reflect changes
    revalidatePath(`/dashboard/issues/${deletedArticle.ref}`);
    revalidatePath(`/archive/${deletedArticle.ref}`);
    ref = deletedArticle.ref;

    // Redirect to the updated issues dashboard
    return { ok: true, ref: deletedArticle.ref };
  } catch (error) {
    // Abort the transaction if any operation fails
    await session.abortTransaction();
    console.error('Transaction failed:', error.message);
    return { ok: false, error: 'Something went wrong', errorType: 'other' };
  } finally {
    session.endSession(); // End the session
    redirect(`/dashboard/issues/${ref}`);
  }
}

export async function updateArticle(formData, url, id) {
  //validate form dtata from frontend
  const { data, error } = articleSchemaForServer.safeParse(formData);
  if (error) {
    const validationError = handleServerSideValidationError(parsedData);
    return { ok: false, error: validationError, errorType: 'validationError' };
  }
  //update article fields to reflect changes by user

  const articleData = {
    ...data,
    slug: `${data.startPage}-${data.endPage}`,
    ref: `volume-${data.volume}-issue-${data.issue}`,
    pdfUrl: url.new !== null ? url.new : url.existing,
  };

  await connectDB();

  const session = await mongoose.startSession();

  try {
    session.startTransaction(); // Start the transaction
    //check if article exists in database
    const article = await Article.findById(id);
    if (!article) {
      return { ok: false, error: 'Article not found', errorType: 'other' };
    }
    //update article in database
    const updatedArticle = await Article.findByIdAndUpdate(
      { _id: id },
      articleData,
      {
        new: true,
      },
      { session }
    );

    if (updatedArticle._id === undefined) {
      await session.abortTransaction();
      return { ok: false, error: 'Something went wrong', errorType: 'other' };
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();

    //revalidate all routes to reflect updated data
    revalidatePath(`/archive/${updatedArticle.ref}`);
    revalidatePath(`/dashboard/issues/${updatedArticle.ref}`);
    return { ok: true };
  } catch (error) {
    console.log('error', error);
    await session.abortTransaction();
    return { ok: false, error: 'Something went wrong', errorType: 'other' };
  } finally {
    session.endSession(); // End the session
  }
}

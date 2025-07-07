'use server';
import { connectDB } from './mongoose/config';
import { User } from './mongoose/models/user';
import { Article } from './mongoose/models/article';
import { Issue } from './mongoose/models/issue';

export const getIssue = async (issueRef) => {
  try {
    connectDB();
    const issue = await Issue.findOne({ ref: issueRef }).lean();

    // const json = JSON.stringify(issue)
    // const issueObject = JSON.parse(json)
    return issue;
  } catch (error) {
    // console.log(error)
  }
};

export const getArticle = async (slug) => {
  connectDB();
  const article = await Article.findOne({
    ref: `${slug.issue}`,
    slug: `${slug.article}`,
  });
  return article;
};

export const getArticlesInIssue = async (issue, sorted = true) => {
  connectDB();
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

export const getArticlesInCurrentIssue = async () => {
  try {
    connectDB();
    const currentIssue = await Issue.find({ published: true, mode: 'final' })
      .sort({ volume: -1 })
      .limit(1);
    if (!!currentIssue.length) {
      const [issue] = currentIssue;
      const articlesInCurrentIssue = await Article.find({
        ref: issue?.ref,
      });
      return { currentIssue, articlesInCurrentIssue };
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUnpublishedIssue = async ({ issueRef }) => {
  try {
    connectDB();
    const unpublishedIssue = await Issue.find({
      published: false,
      ref: issueRef,
    }).populate('articles');
    return unpublishedIssue;
  } catch (error) {
    console.log(error);
  }
};

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

// app/api/pdf/increment-view/route.js
import { connectDB } from '@/lib/mongoose/config';
import { Article } from '@/lib/mongoose/models/article';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { articleId, issueRef, articleSlug } = await request.json();

    // Validate required parameters
    if (!articleId && !(issueRef && articleSlug)) {
      return NextResponse.json(
        { error: 'Article identifier is required' },
        { status: 400 }
      );
    }

    await connectDB();

    let query = {};

    // Prefer using MongoDB ObjectId if available
    if (articleId) {
      query = { _id: articleId };
    } else {
      // Fall back to using ref and slug
      query = { ref: issueRef, slug: articleSlug };
    }

    // Increment the view count
    const updatedArticle = await Article.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      viewCount: updatedArticle.viewCount,
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json(
      { error: 'Failed to increment view count' },
      { status: 500 }
    );
  }
}

// API route to increment view count
export const incrementAbstractViews = async (
  articleId,
  issueRef,
  articleSlug
) => {
  console.log(articleId, issueRef, articleSlug);
  try {
    const response = await fetch('/api/pdf/increment-abstract-views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId,
        issueRef,
        articleSlug,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to increment abstract view count');
    }

    const data = await response.json();
    return data.views;
  } catch (error) {
    console.error('Error incrementing abstract view count:', error);
    return null;
  }
};

// API route to increment view count
export const incrementArticleViews = async (
  articleId,
  issueRef,
  articleSlug
) => {
  console.log(articleId, issueRef, articleSlug);
  try {
    const response = await fetch('/api/pdf/increment-article-views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId,
        issueRef,
        articleSlug,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to increment view count');
    }

    const data = await response.json();
    return data.articleViews;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return null;
  }
};

// API route to increment download count
export const incrementDownloadCounts = async (
  articleId,
  issueRef,
  articleSlug
) => {
  console.log(articleId, issueRef, articleSlug);
  try {
    const response = await fetch('/api/pdf/increment-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId,
        issueRef,
        articleSlug,
      }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to increment download count');
    }

    const data = await response.json();
    return data.views;
  } catch (error) {
    console.error('Error incrementing download count:', error);
    return null;
  }
};

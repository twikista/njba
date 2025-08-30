import { getIssues } from '@/lib/actions/issues';
import { menuItems } from '@/static/menuItems';
import { config } from '@/lib/config';
import { getAllPublishedArticles } from '@/lib/actions/articles';

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL;
  const siteMapBaseUrl = process.env.SITEMAP_BASE_URL;
  const navbarMenuEntries = menuItems
    .map((item) => (item.subMenuItems ? item.subMenuItems : null))
    .flat()
    .filter((i) => i !== null)
    .map((item) => {
      return {
        url: `${siteMapBaseUrl}${item.url}`,
      };
    });

  const publishedIssues = await getIssues('published');
  const archiveMenu = publishedIssues.map((issue) => {
    return {
      url: `${siteMapBaseUrl}/archive/${issue?.ref}`,
      lastModified: new Date().toISOString(
        issue?.updatedAt || issue?.createdAt
      ),
    };
  });

  const publishedArticles = await getAllPublishedArticles();
  const publishedArticleEntries = publishedArticles.map((article) => {
    return {
      url: `${siteMapBaseUrl}/archive/${article?.ref}/${article?.slug}`,
      lastModified: new Date().toISOString(
        article?.updatedAt || article?.createdAt
      ),
    };
  });

  // const pusblishedArticlesPdfEntries = publishedArticles.map((article) => {
  //   return {
  //     url: `${siteMapBaseUrl}/archive/${article?.ref}/${article?.slug}/view`,
  //   };
  // });

  return [
    {
      url: `${baseUrl}`,
    },
    {
      url: `${baseUrl}/contact`,
    },
    {
      url: `${baseUrl}/reviewers-guide`,
    },
    ...navbarMenuEntries,
    ...archiveMenu,
    ...publishedArticleEntries,
    // ...pusblishedArticlesPdfEntries,
  ];
}

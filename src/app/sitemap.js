import { getIssues } from '@/lib/actions/issues';
import { menuItems } from '@/static/menuItems';
import { config } from '@/lib/config';
import { getAllPublishedArticles } from '@/lib/actions/articles';

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL;
  console.log(baseUrl);
  const navbarMenuEntries = menuItems
    .map((item) => (item.subMenuItems ? item.subMenuItems : null))
    .flat()
    .filter((i) => i !== null)
    .map((item) => {
      return { url: `${baseUrl}${item.url}` };
    });

  const publishedIssues = await getIssues('published');
  const archiveMenu = publishedIssues.map((issue) => {
    return {
      url: `${baseUrl}/archive/${issue?.ref}`,
    };
  });

  const publishedArticles = await getAllPublishedArticles();
  const publishedArticleEntries = publishedArticles.map((article) => {
    return {
      url: `${baseUrl}/archive/${article?.ref}/${article?.slug}`,
    };
  });

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
  ];
}

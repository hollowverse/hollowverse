/** @type {import('next-sitemap').IConfig} */
const sanityClient_ = require('@sanity/client');
const groq = require('groq');

const sanityClient = sanityClient_({
  projectId: 'ge8aosp3', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2022-03-20',
  useCdn: true, // `false` if you want to ensure fresh data
});

module.exports = {
  siteUrl: 'https://hollowverse.com',

  generateRobotsTxt: true,

  exclude: ['*'],

  additionalPaths: async (config) => {
    const results = await sanityClient.fetch(
      groq`{
        'celebs': *[_type == 'celeb']{'slug': slug.current},
        'facts': *[_type == 'fact']{
          _id,
          'slug': celeb->slug.current,
          'tags': tags[]{'tagId': tag._ref, 'issueId': tag->topic._ref}
        }
      }`,
    );

    const urls = [
      // Celeb pages
      ...results.celebs.map((c) => `${c.slug}`),

      ...results.facts.flatMap((f) => [
        // Fact pages
        `${f.slug}/fact/${f._id}`,

        ...f.tags.flatMap((t) => [
          // Master Issue pages
          `~issue/${t.issueId}`,

          // Celeb Issue pages
          `${f.slug}/issue/${t.issueId}`,
        ]),

        // Tag pages
        ...f.tags.map((t) => `${f.slug}/tag/${t.tagId}`),
      ]),
    ];

    const uniqueUrls = [...new Set(urls)];

    uniqueUrls.sort();

    return uniqueUrls.map((url) => ({
      loc: url,
    }));
  },
};

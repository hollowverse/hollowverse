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
          'tags': tags[]{'_ref': tag._ref},
          'issues': topics[]{_ref}
        }
      }`,
    );

    const urls = [
      // Celeb pages
      ...results.celebs.map((c) => `${c.slug}`),

      // Fact pages
      ...results.facts.map((f) => `${f.slug}/fact/${f._id}`),

      ...results.facts.flatMap((f) => [
        ...f.issues.flatMap((i) => [
          // Master Issue pages
          `~issue/${i._ref}`,

          // Celeb Issue pages
          `${f.slug}/issue/${i._ref}`,
        ]),

        // Tag pages
        ...f.tags.map((t) => `${f.slug}/tag/${t._ref}`),
      ]),
    ];

    const uniqueUrls = [...new Set(urls)];

    uniqueUrls.sort();

    return uniqueUrls.map((url) => ({
      loc: url,
    }));
  },
};

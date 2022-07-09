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
    const urls = await sanityClient.fetch(
      groq`[
        // Celeb pages
        ...*[_type == 'celeb']{
          'url': slug.current
        }.url,

        // Fact pages
        ...*[_type == 'fact']{
          'url': celeb->slug.current + '/fact/' + _id
        }.url,

        // Celeb Tag pages
        ...*[_type == 'fact']{
          'tags': tags[]{
            'url': ^.celeb->slug.current + '/tag/' + tag._ref
          }.url
        }.tags[0...9999],

        // Issue pages
        ...*[_type == 'topic']{
          'url': '~issue/' + _id
        }.url
      ]`,
    );

    const uniqueUrls = [...new Set(urls)];

    return uniqueUrls.map((url) => ({
      loc: url,
    }));
  },
};

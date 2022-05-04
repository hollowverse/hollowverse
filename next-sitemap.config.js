/** @type {import('next-sitemap').IConfig} */
const sanityClient_ = require('@sanity/client');

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
    const docs = await sanityClient.fetch(
      `*[_type == 'celeb']{'loc': '/' + slug.current}`,
    );

    return docs;
  },
};

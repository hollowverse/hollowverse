module.exports = {
  siteMetadata: {
    siteUrl: 'https://hollowverse.com',
    title: 'hollowverse',
  },
  plugins: [
    'gatsby-plugin-typescript',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    'gatsby-plugin-tsconfig-paths',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
  ],
};

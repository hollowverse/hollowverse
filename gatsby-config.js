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
    'gatsby-theme-material-ui',
    `gatsby-plugin-sass`,
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
  ],
};

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'hollowverse',
  },
  plugins: [
    'gatsby-plugin-typescript',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    'gatsby-theme-material-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
};

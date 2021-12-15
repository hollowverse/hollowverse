const pagesToDelete = [];

exports.onCreatePage = ({ page, actions }) => {
  // if (page.path === '/alyson-hannigan/') {
  //   actions.deletePage(page);
  // }
};

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          use: ['html-loader', 'markdown-loader'],
        },
      ],
    },
  });
};

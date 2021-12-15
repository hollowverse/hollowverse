const pagesToDelete = [];

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);

  createPage({
    ...page,
    context: {
      ...page.context,
    },
  });

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

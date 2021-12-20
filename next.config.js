module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/index/index.html',
        },
      ],
    };
  },
};

module.exports = {
  async rewrites() {
    return {
      beforeFiles: [{
        source: '/:path'
        destination: '/:path/index.html'
      }]
    };
  },
};

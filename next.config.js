module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/test.html',
      },
    ];
  },
};

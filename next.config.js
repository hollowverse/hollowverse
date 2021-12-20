module.exports = {
  async rewrites() {
    return [
      {
        source: '/foo',
        destination: '/test.html',
      },
    ];
  },
};

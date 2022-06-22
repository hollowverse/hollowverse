module.exports = function (config, options) {
  config.module.rules[0].exclude = {
    test: /(node_modules|bower_components)/,
    not: [/pino-logflare/, /batch2/],
  };

  config.resolve.symlinks = false;

  return config;
};

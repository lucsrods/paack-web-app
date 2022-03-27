const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Constants': path.resolve(__dirname, 'src/constants'),
      '@Contexts': path.resolve(__dirname, 'src/contexts'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
    },
  };
  return config;
};
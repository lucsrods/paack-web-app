import path from 'path';

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
    },
  };
  return config;
};
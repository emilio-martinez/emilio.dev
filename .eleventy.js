module.exports = function (config) {
  config.addPassthroughCopy('src/media');
  config.addPassthroughCopy('src/admin');
  config.addPassthroughCopy('src/robots.txt');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    passthroughFileCopy: true,
  };
};

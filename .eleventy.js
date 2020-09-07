module.exports = function (config) {
  config.addPassthroughCopy(`src/site/assets`);
  config.addPassthroughCopy(`src/site/robots.txt`);

  return {
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    passthroughFileCopy: true,
  };
};

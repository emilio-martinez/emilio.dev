const { resolve } = require('path');

module.exports = function (config) {
  config.addPassthroughCopy(`src/site/robots.txt`);
  config.addPassthroughCopy(`src/site/assets`);

  // Add bundler built assets as watch targets. They're ignored by default due to gitignore.
  config.addWatchTarget(resolve(__dirname, `./src/site/assets/build/`));

  return {
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    passthroughFileCopy: true,
  };
};

const { resolve } = require('path');
const htmlmin = require('html-minifier');

module.exports = function (config) {
  config.addPassthroughCopy(`src/site/robots.txt`);
  config.addPassthroughCopy(`src/site/assets`);

  // Add bundler built assets as watch targets. They're ignored by default due to gitignore.
  config.addWatchTarget(resolve(__dirname, `./src/site/assets/build/`));

  // Minify HTML
  config.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }

    return content;
  });

  return {
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    passthroughFileCopy: true,
  };
};

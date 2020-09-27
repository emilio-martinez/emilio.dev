module.exports = (api) => {
  /** @type {*} */
  let targets = { esmodules: true };

  if (api.caller((caller) => caller && caller.target === 'node')) {
    targets = { node: 'current' };
  } else if (api.env('legacy')) {
    targets = { browsers: `> 0.5%, last 2 versions, Firefox ESR, not dead, IE 11` };
  }

  return {
    compact: true,
    parserOpts: {
      strictMode: true,
    },
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          bugfixes: true,
          targets,
        },
      ],
      ['@babel/preset-typescript', { allowDeclareFields: true }],
    ],
    plugins: [
      ['babel-plugin-const-enum', { transform: 'removeConst' }],
      ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ['@babel/plugin-proposal-class-properties'],
      ['@babel/plugin-transform-runtime'],
    ],
  };
};

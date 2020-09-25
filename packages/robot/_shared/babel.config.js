module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ["module-resolver", {
      alias: {
        "@robot/shared": "./src",
        "@shared": "./src/shared",
        "@modules": "./src/modules",
        "@infra": "./src/infra",
        "@config": "./src/config"
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { "legacy": true }],
    ['@babel/plugin-proposal-class-properties', { "loose": true }],
  ]
};

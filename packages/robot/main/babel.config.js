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
        "@robot/shared": "../_shared/dist",
        "@shared": "./src/shared",
        "@modules": "./src/modules",
        "@infra": "./src/infra",
        "@config": "./src/config",
        "@utils": "./src/utils"
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { "legacy": true }],
    ['@babel/plugin-proposal-class-properties', { "loose": true }],
  ]
};

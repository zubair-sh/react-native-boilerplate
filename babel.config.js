module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@features': './src/features',
            '@shared': './src/shared',
            '@store': './src/store',
            '@theme': './src/theme',
            '@i18n': './src/i18n',
            '@services': './src/services',
          },
        },
      ],
    ],
  };
};

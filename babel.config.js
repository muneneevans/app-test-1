module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          src: './src',
          store: './src/Store',
          components: './src/Components',
          pages: './src/Pages',
          assets: './assets',
        },
      },
    ],
  ],
};

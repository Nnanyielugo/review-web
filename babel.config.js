module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    [
      'babel-plugin-module-resolver', {
        root: ['./src'],
        alias: {
          _components: './src/components',
          _providers: './src/providers',
          _pages: './src/pages',
          _utils: './src/utils',
          _test_utils: './setup/utils',
        },
      },
    ],
    '@babel/plugin-transform-runtime',
  ],
};

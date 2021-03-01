module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    [
      'babel-plugin-module-resolver', {
        root: ['./src'],
        alias: {
          components: './src/components',
          providers: './src/providers',
          pages: './src/pages',
          utils: './src/utils',
        },
      },
    ],
  ],
};

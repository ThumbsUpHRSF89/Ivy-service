module.exports = {
  entry: './client/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              root: '.',
              // url: false,
            },
          }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: './public/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

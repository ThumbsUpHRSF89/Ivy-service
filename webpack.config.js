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
              fallback: 'style-loader',
            },
          }],
      },
      {
        test: /\.(png|jp(e*)g|svg|woff)$/,  
        use: [{
          loader: 'url-loader',
          options: { 
            limit: 300000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]',
          },
        }],
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

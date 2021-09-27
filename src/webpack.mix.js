const mix = require('laravel-mix')

mix.options({
  terser: {
    extractComments: false,
  }
})

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: Config.babel()
          }
        ]
      }
    ]
  }
})

mix
  .js('js/helpers.js', 'js/')
  .js('js/app.js', 'js/')
  .js('js/post.js', 'js/')
  .extract()
  .setResourceRoot('/assets')
  .setPublicPath('../assets')
  .sass('sass/app.scss', 'css/')
  .sass('sass/home.scss', 'css/')
  .sass('sass/post.scss', 'css/')
  .sass('sass/collection.scss', 'css/')
  .sass('sass/taxonomy.scss', 'css/')
  .sass('sass/search.scss', 'css/')
  .sass('sass/auth.scss', 'css/')
  .sass('sass/membership.scss', 'css/')
  .sass('sass/account.scss', 'css/')
  .sass('sass/404.scss', 'css/')
  .options({
    processCssUrls: false
  })
  .copy('sass/fonts/firma/*.*', '../assets/fonts/firma/')
  .copy('sass/fonts/poppins/*.*', '../assets/fonts/poppins/')
  .copy('js/vendor/search-libs.min.js', '../assets/js/vendor/')
  .browserSync({
    proxy: "localhost:2368",
    files: [
      'js/**/*.js',
      'sass/**/*.scss',
      '../**/*.hbs'
    ]
  })

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [
      require('cssnano')({
        preset: ['advanced', {
          discardComments: { removeAll: true },
          reduceIdents: false, // Безопасно для анимаций
          zindex: false, // Безопасно для z-index
        }],
      }),
    ] : []),
  ],
}

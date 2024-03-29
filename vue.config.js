const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  transpileDependencies: [/node_modules[/\\\\]uuid[/\\\\]/],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import './src/scss/global.variables.scss';`
      }
    }
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@$', resolve('src'))
      .set("node_modules", path.resolve(__dirname, "./node_modules"))
      .set('assets',resolve('src/assets'))
      .set('router',resolve('src/route/router'))
      .set('components',resolve('src/components'))
      .set('scss',resolve('src/scss'))
      .set('public',resolve('src/public'))
      .set('utility',resolve('src/utility'))
      .set('pages',resolve('src/pages'))
  },
  lintOnSave: false
}
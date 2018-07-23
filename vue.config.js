const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    proxy: 'http://localhost:3001'
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('styles',resolve('src/styles'))
      .set('components',resolve('src/components'))
      .set('socketHandler',resolve('src/socketHandler'))
      .set('layout',resolve('src/layout'))
      .set('base',resolve('src/base'))
      .set('static',resolve('src/static'))
  }
};

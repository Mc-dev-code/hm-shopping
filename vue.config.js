const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 新增下面这一段 devServer 代理配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://smart-shop.itheima.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})

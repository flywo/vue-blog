const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: (config) => {
        config.plugin('html').tap(args => {
            args[0].title = '余华的个人博客';
            return args;
        })
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            },
            "/upload": {
                target: "http://localhost:8081"
            },
        }
    }
})
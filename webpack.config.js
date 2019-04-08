const {join} = require('path')

module.exports = {
    entry: './web/index.js',
    output: {
        path: join(__dirname, 'build'),
        filename: 'main.js'
    },

    devServer: {
        port:8080,
        contentBase: join(__dirname, 'public')
    }
}
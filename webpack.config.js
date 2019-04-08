

module.exports = {
    entry: './web/index.js',
    output: {
        path: './build',
        filename: 'main.js'
    },

    devServer: {
        port:8080,
        contentBase: './public'
    }
}
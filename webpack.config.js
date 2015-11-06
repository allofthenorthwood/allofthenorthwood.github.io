module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js',
        publicPath: 'http://localhost:8070/assets',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
}

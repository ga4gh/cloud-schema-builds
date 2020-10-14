const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "node",
    entry: {
        'gh-openapi-docs': './src/gh-openapi-docs.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, 'src/lib')
        },
        extensions: ['.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-transform-regenerator'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
    ],
    stats: {
        // Ignore warnings due to yarg's dynamic module loading
        warningsFilter: [/node_modules\/yargs/]
    }
}
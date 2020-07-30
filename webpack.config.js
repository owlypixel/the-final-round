var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                "presets": ["@babel/preset-env","@babel/preset-react"]
              }
            }
        }, 
        {
            test: /\.pug/,
            use: ["html-loader", "pug-html-loader"]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                    },
                },
            ],
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.pug'
        })
    ]
};
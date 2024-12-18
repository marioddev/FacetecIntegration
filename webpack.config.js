const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env.DEVICE_KEY_IDENTIFIER': JSON.stringify(process.env.DEVICE_KEY_IDENTIFIER),
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
            'process.env.BASE_URL_API': JSON.stringify(process.env.BASE_URL_API),
            'process.env.PUBLIC_FACE_SCAN_ENCRYPTION_KEY': JSON.stringify(process.env.PUBLIC_FACE_SCAN_ENCRYPTION_KEY)
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8001,
        open: true,
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
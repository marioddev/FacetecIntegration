const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index2.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/dist',
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
        alias: {
            util: require.resolve("util/"),
            stream: require.resolve("stream-browserify"),
            path: require.resolve("path-browserify"),
            url: require.resolve("url/"),
            fs: false,
            querystring: require.resolve("querystring-es3"),
            http: false,
            crypto: require.resolve("crypto-browserify"),
            zlib: require.resolve("browserify-zlib"),
            net: false,
            assert: require.resolve("assert/")
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8001,
        open: true,
        // setupMiddlewares: (middlewares, devServer) => {
        //     if (!devServer) {
        //         throw new Error('webpack-dev-server is not defined');
        //     }

        //     devServer.app.get('/.well-known/openid-configuration', (req, res) => {
        //         res.json({
        //             issuer: process.env.URL_ISSUER || "https://192.168.100.6:63906",
        //             authorization_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/authorize",
        //             token_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/token",
        //             userinfo_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/userinfo",
        //             jwks_uri: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/.well-known/jwks.json",
        //             response_types_supported: ["code", "token", "id_token"],
        //             subject_types_supported: ["public"],
        //             id_token_signing_alg_values_supported: ["RS256"],
        //             scopes_supported: ["openid", "profile", "email"],
        //             token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
        //             claims_supported: ["sub", "iss", "aud", "exp", "iat", "auth_time", "nonce", "name", "email"]
        //         });
        //     });

        //     return middlewares;
        // }
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
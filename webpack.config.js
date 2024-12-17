// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV == 'production';

const openIDConfig = {
    issuer: process.env.URL_ISSUER || "https://192.168.100.6:63906",
    authorization_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906")+ "/authorize",
    token_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906")+ "/token",
    userinfo_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906")+ "/userinfo",
    jwks_uri: (process.env.URL_ISSUER || "https://192.168.100.6:63906")+ "/.well-known/jwks.json",
    response_types_supported: ["code", "token", "id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
    claims_supported: ["sub", "iss", "aud", "exp", "iat", "auth_time", "nonce", "name", "email"]
};

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist', // Asegúrate de que los recursos se sirvan desde la raíz del sitio
        //filename: '[name].bundle.js',
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
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

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
            // {
            //     test: /\.(data|wasm)$/, // Maneja archivos .data y .wasm
            //     type: 'asset/resource', // Usa Webpack 5's asset/resource
            // },

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
      https: {
        key: './key.pem', // Ruta a tu archivo key.pem
        cert: './cert.pem' // Ruta a tu archivo cert.pem
      },
      open: true, // Opcional: abrir automáticamente en el navegador
      setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            devServer.app.get('/.well-known/openid-configuration', (req, res) => {
                res.json(openIDConfig);
            });

            return middlewares;
        }
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

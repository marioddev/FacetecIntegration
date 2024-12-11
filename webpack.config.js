// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV == 'production';


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
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
            {
                test: /\.(data|wasm)$/, // Maneja archivos .data y .wasm
                type: 'asset/resource', // Usa Webpack 5's asset/resource
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
      https: {
        key: './key.pem', // Ruta a tu archivo key.pem
        cert: './cert.pem' // Ruta a tu archivo cert.pem
      },
      open: true // Opcional: abrir automáticamente en el navegador
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

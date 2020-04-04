const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || "development"

if (process.env.NODE_ENV === "test") {
    require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === "development") {
    require('dotenv').config({ path: '.env.development' })
}

module.exports = (env) => {
    const isProduction = env === "production"

    return {
        mode: isProduction ? 'production' : 'development',
        entry: ["./src/app.js"],
        output: {
            path: path.resolve(__dirname, "public", "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },{
                test: /\.s?css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    // style-loader handles the inlining of the styles
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
                // whenever webpack encounters a .scss file,
                // first: it gets the .scss code
                // second: convert .scss into .css
                // finally; get it showing up in the browser by dumping it into a style tag
            }]
        },
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            // tells devServer that we're going to be handling routing via client side code,
            // and that it should return index.html for all 404 routes
            publicPath: "/dist/"
            // The bundled files will be available in the browser under this path.
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css"
            }),
            new webpack.DefinePlugin({
                "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                "process.env.FIREBASE_APP_ID": JSON.stringify(process.env.FIREBASE_APP_ID)
            })
        ],
        devtool: isProduction ? "source-map" : "inline-source-map"
    }
}

// node-sass takes our Sass or SCSS code & converts it into regular CSS
// sass-loader enables loading SCSS

// react-router --> web-app, native app
// react-router-dom --> web-app
// react-router-native --> native app
const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");

module.exports = {
  name: "client",
  entry: [
    "react-hot-loader/patch",
    "@babel/runtime/regenerator",
    "webpack-hot-middleware/client?reload=true",
    "./src/client/index.tsx"
  ],
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../../clientBuild"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          { loader: "css-loader" },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new LoadablePlugin({
      writeToDisk: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        WEBPACK: true
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

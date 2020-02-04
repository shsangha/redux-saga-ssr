import express from "express";
const server = express();
const expressStaticGzip = require("express-static-gzip");
import webpack from "webpack";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";

import configDevClient from "../../webpack/dev/client.js";
import configDevServer from "../../webpack/dev/server.js";
import configProdClient from "../../webpack/prod/client.js";
import configProdServer from "../../webpack/prod/server.js";

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
if (isDev) {
  const compiler = webpack([configDevClient, configDevServer]);

  const clientCompiler = compiler.compilers[0];

  const webpackDevMiddleware = require("webpack-dev-middleware")(compiler, {
    serverSideRender: true,
    writeToDisk: true
  });

  const webpackHotMiddlware = require("webpack-hot-middleware")(
    clientCompiler,
    configDevClient.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddlware);
  server.use(webpackHotServerMiddleware(compiler));
  server.use((req, res) => {
    const render = require("../../serverBuild/dev-server-bundle.js").default;

    render()(req, res);
  });
} else {
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const render = require("../../serverBuild/prod-server-bundle.js").default;

    server.use(
      expressStaticGzip("dist", {
        enableBrotli: true
      })
    );
    server.use(render());
  });
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(
    `Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`
  );
});

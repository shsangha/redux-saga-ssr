import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../client/components/Routes";
import { ChunkExtractor } from "@loadable/server";
const path = require("path");

export default () => (req, res) => {
  const statsFile = path.resolve("clientBuild/loadable-stats.json");

  const extractor = new ChunkExtractor({
    statsFile
  });

  const jsx = extractor.collectChunks(
    <StaticRouter location={req.originalUrl} context={{}}>
      <Routes />
    </StaticRouter>
  );

  const html = renderToString(jsx);

  res.send(`
    <html>
      <head>
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body>
        <div id="react-root">${html}</div>
        ${extractor.getScriptTags()}       
      </body>
    </html>
  `);
};

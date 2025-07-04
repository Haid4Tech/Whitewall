const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  interface ServerCallback {
    (req: IncomingMessage, res: ServerResponse): void;
  }

  interface HandleFunction {
    (
      req: IncomingMessage,
      res: ServerResponse,
      parsedUrl?: UrlWithParsedQuery
    ): void;
  }

  const serverCallback: ServerCallback = (req, res) => {
    const parsed: UrlWithParsedQuery = parse(req.url!, true);
    (handle as HandleFunction)(req, res, parsed);
  };

  createServer(serverCallback).listen(process.env.PORT || 3000, () => {
    console.log("Ready on port", process.env.PORT || 3000);
  });
});

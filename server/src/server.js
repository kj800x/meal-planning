import express from "express";
import http from "http";
import path from "path";
import process from "process";
import * as localproxy from "@kj800x/localproxy-client";
import { DATA_DIR } from "./env/dataDir";

import { apolloServer } from "./schema";

async function main() {
  const PORT = await localproxy.getAvailablePort();
  const expressApp = express();
  const httpServer = http.createServer(expressApp);

  const localproxyConfig = {
    id: "meals",
    name: "Meal Planner",
    pid: process.pid,
    routes: [
      {
        static: true,
        route: "/meals",
        staticDir: path.resolve(__dirname, "../../ui/build/"),
        rootIndexFallback: true,
        priority: 0,
        type: "ui",
      },
      {
        static: false,
        route: "/meals/graphql",
        hostname: "localhost",
        port: PORT,
        trimRoute: false,
        priority: 0,
        type: "api",
      },
      {
        static: true,
        route: "/meals/assets",
        staticDir: path.resolve(DATA_DIR, "assets/"),
        priority: 0,
        type: "data",
      },
    ],
  };

  apolloServer.applyMiddleware({
    app: expressApp,
    path: "/meals/graphql",
  });
  apolloServer.installSubscriptionHandlers(httpServer);

  const runningHttpServer = httpServer.listen(PORT, async () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    localproxy.register(localproxyConfig);
  });

  process.on("SIGINT", () => {
    localproxy.deregister(localproxyConfig);
    runningHttpServer.close();
    process.exit(0);
  });
}

main().catch(console.error);

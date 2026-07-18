import app from "./app";
import {env} from "./config/env";

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  console.log(`📘 Swagger Docs: http://localhost:${env.PORT}/api/docs`);
});

const shutdown = () => {
  console.log("Shutting down server...");

  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import routes from "./routes";
import notFound from "./middlewares/not-found";
import errorHandler from "./middlewares/error-handler";

dotenv.config();

const app = express();

const swaggerDocument = YAML.load(
  path.join(__dirname, "docs", "openapi.yaml")
);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Globalco Job Board API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/api", routes);

app.use(notFound);

app.use(errorHandler);

export default app;
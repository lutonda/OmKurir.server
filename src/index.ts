import express, { Express, Request, Response } from "express";
import "reflect-metadata";

import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./routes/router";
import { connection } from "./models";

import winston from 'winston';
import expressWinston from 'express-winston';

dotenv.config();
console.log(process.env);
const app: Express = express();
const port = process.env.PORT;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests
});
app.use(limiter);

var corsOptions = {
  origin: "*",
};

app.use(cors());

const loggerOptions={
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
};
app.use(expressWinston.logger(loggerOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Handle errors gracefully
app.use((err: any, req: Request, res: Response, next: any) => {
  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message,
  });
});

app.use("/api/v2/", router);
app.get("/", (req: Request, res: Response) => {
  console.log(process.env);
  res.json("OmKurir server is Up");
});

const start = async (): Promise<void> => {
  try {
    await connection.sync({ alter: true });
    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();

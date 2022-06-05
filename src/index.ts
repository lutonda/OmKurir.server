import express, { Express, Request, Response } from "express";
import "reflect-metadata";

import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./routes/router";
import { connection } from "./models";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 4000;

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
  res.json("OmKurir server is Up");
});

const start = async (): Promise<void> => {
  try {
    await connection.sync({alter:true});
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

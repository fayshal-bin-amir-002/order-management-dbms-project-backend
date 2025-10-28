import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://order-management-frontend-psi.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/v1", router);

const getAController = async (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Order Management server is running...",
    time: new Date().toLocaleTimeString(),
    version: "1.0.0",
  });
};

app.get("/", getAController);

app.use(globalErrorHandler);

app.use(notFound);

export default app;

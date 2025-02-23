import express from "express";
import { appRouter } from "./app.routes";

const appRouter = express.Router();

appRouter.use("/api", appRouter);

export { appRouter };

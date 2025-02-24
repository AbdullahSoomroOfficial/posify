import "./config/load-env-variables";
import { app } from "./app";
import { connectDB } from "./db/connect-db";
import chalk from "chalk";

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(
    `[server]: Server is running at ${chalk.blue(
      `http://localhost:${process.env.PORT}`
    )}`
  );
  console.log(
    `[server]: Api docs available at ${chalk.blue(
      `http://localhost:${process.env.PORT}/api-docs`
    )}`
  );
  console.log("==============================================================");
});

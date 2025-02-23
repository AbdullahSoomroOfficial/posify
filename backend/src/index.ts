import { app } from "./app";
import { connectDB } from "./db/connect-db";

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});

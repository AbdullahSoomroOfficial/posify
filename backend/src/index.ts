import { app } from "./app";
import { connectDB } from "./databases/connect-db.database";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectDB();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

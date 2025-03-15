import mongoose from "mongoose";

/* Enable runValidators globally for all update methods */
mongoose.set("runValidators", true);

/* Removes __v key from all schemas */
mongoose.plugin((schema) => {
  schema.set("versionKey", false);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`[server] MongoDB connected`);
  } catch (error) {
    console.error("[server] MongoDB connection error");
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };

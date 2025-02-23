import mongoose from "mongoose";

// Enable runValidators globally for all update methods
mongoose.set("runValidators", true);

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL ||
        "mongodb://localhost:27017/inventory-management-system"
    );
    console.log(`[server]: MongoDB connected`);
  } catch (error) {
    console.error("[server]: MongoDB connection error");
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };

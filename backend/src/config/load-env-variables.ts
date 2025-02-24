import dotenv from "dotenv";
import path from "path";
import { z } from "zod";
import chalk from "chalk";

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"], {
    errorMap: () => ({
      message: 'NODE_ENV must be either "production" or "development"',
    }),
  }),
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.string().url(),
});

type EnvSchema = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}

const loadEnvVariables = () => {
  const envFilePath = path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV}`
  );
  dotenv.config({ path: envFilePath });
  const parsedEnv = envSchema.safeParse(process.env);
  if (parsedEnv.success) {
    console.log(
      "=============================================================="
    );
    console.log(
      `[server] Environment variables loaded from ${chalk.blue(
        `.env.${process.env.NODE_ENV}`
      )}`
    );
    console.table(parsedEnv.data);
  } else {
    console.error(
      "[server] Invalid environment variables:",
      parsedEnv.error.format()
    );
    process.exit(1);
  }
};

loadEnvVariables();

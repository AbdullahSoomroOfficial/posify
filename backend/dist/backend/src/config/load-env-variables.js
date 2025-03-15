"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
const chalk_1 = __importDefault(require("chalk"));
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["production", "development"], {
        errorMap: () => ({
            message: 'NODE_ENV must be either "production" or "development"',
        }),
    }),
    PORT: zod_1.z.coerce.number().min(1000),
    DATABASE_URL: zod_1.z.string().url(),
});
const loadEnvVariables = () => {
    const envFilePath = path_1.default.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
    dotenv_1.default.config({ path: envFilePath });
    const parsedEnv = envSchema.safeParse(process.env);
    if (parsedEnv.success) {
        console.log("==============================================================");
        console.log(`[server] Environment variables loaded from ${chalk_1.default.blue(`.env.${process.env.NODE_ENV}`)}`);
        console.table(parsedEnv.data);
    }
    else {
        console.error("[server] Invalid environment variables:", parsedEnv.error.format());
        process.exit(1);
    }
};
loadEnvVariables();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/load-env-variables");
const connect_db_1 = require("./db/connect-db");
const app_1 = require("./app");
const chalk_1 = __importDefault(require("chalk"));
app_1.app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_db_1.connectDB)();
    console.log(`[server] Server is running at ${chalk_1.default.blue(`http://localhost:${process.env.PORT}`)}`);
    console.log(`[server] Api docs available at ${chalk_1.default.blue(`http://localhost:${process.env.PORT}/api-docs`)}`);
    console.log("==============================================================");
}));

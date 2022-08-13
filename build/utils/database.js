"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connect() {
    try {
        mongoose_1.default.connect(String(process.env.MONGO_PATH));
    }
    catch (error) {
        console.log(error);
    }
}
exports.connect = connect;

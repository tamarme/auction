"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const item_controller_1 = __importDefault(require("./modules/item/item.controller"));
const app_1 = __importDefault(require("./app"));
const app = new app_1.default([new item_controller_1.default()], Number(process.env.PORT));
app.listen();

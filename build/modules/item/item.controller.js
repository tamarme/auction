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
const express_1 = require("express");
const http_exception_1 = __importDefault(require("../../utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("../../utils/middlewares/validation.middleware"));
const item_validation_1 = __importDefault(require("./item.validation"));
const item_service_1 = __importDefault(require("./item.service"));
class ItemController {
    constructor() {
        this.path = '/items';
        this.router = (0, express_1.Router)();
        this.itemService = new item_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(item_validation_1.default.create), this.create.bind(this));
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description } = req.body;
                const item = yield this.itemService.create(title, description);
                res.status(201).json({ item });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
    }
}
exports.default = ItemController;

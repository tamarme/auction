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
const user_validation_1 = __importDefault(require("./user.validation"));
const user_service_1 = __importDefault(require("./user.service"));
const authenticated_middleware_1 = require("../../utils/middlewares/authenticated.middleware");
class UserController {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.userService = new user_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.register.bind(this));
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login.bind(this));
        this.router.get(`${this.path}`, authenticated_middleware_1.authenticated, this.getUser.bind(this));
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, username, password } = req.body;
                const token = yield this.userService.register(email, username, password, 'user');
                res.status(201).json({ token });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login(email, password);
                res.status(200).json({ token });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
    }
    getUser(req, res, next) {
        if (!req.user)
            return next(new http_exception_1.default(404, 'no logged in user'));
        res.status(200).json({ user: req.user });
    }
}
exports.default = UserController;

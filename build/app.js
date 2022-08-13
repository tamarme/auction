"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./utils/database");
const error_middleware_1 = __importDefault(require("./utils/middlewares/error.middleware"));
class App {
    constructor(controller, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeController(controller);
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeController(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    initializeDatabaseConnection() {
        (0, database_1.connect)();
    }
    initializeErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`);
        });
    }
}
exports.default = App;

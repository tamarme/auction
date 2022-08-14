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
const user_model_1 = __importDefault(require("./user.model"));
const token_1 = require("../../utils/token");
class UserService {
    register(email, username, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.create({ email, username, password, role });
                const accessToken = (0, token_1.createToken)(user);
                return accessToken;
            }
            catch (error) {
                throw new Error('Unable to create user');
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email });
                if (!user)
                    throw new Error('Unable to find user');
                if (yield user.isValidPassword(password))
                    return (0, token_1.createToken)(user);
                else
                    throw new Error('Incorrect credentials');
            }
            catch (error) {
                throw new Error('Incorrect credentials');
            }
        });
    }
}
exports.default = UserService;

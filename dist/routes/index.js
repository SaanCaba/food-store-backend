"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foods_router_js_1 = __importDefault(require("./foods.router.js"));
const app = (0, express_1.default)();
app.use('/foods', foods_router_js_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map
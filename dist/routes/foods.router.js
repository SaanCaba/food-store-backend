"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = require("../middlewares/validator.handler");
const foods_schema_1 = require("../schemas/foods.schema");
const FoodsService_1 = __importDefault(require("../services/FoodsService"));
const router = express_1.default.Router();
const service = new FoodsService_1.default();
router.get('/', async (req, res) => {
    let foods = await service.getAllFoods();
    return res.status(200).json(foods);
});
router.get('/filter', 
// validateHandler(getTypeSchema, 'query'),
(req, res, next) => {
    try {
        const { type } = req.query;
        console.log(type);
        let foodsType = service.getTypeOfFood(type);
        return res.status(200).json(foodsType);
    }
    catch (error) {
        next(error);
    }
});
router.get('/byname', async (req, res, next) => {
    try {
        const { name } = req.query;
        const filteredProducts = await service.findByName(name);
        console.log("filteredProducts", filteredProducts);
        return res.status(200).json(filteredProducts);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let food = await service.findOneFood(id);
        return res.status(200).json(food);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', (0, validator_handler_1.validateHandler)(foods_schema_1.getFormSchema, 'body'), async (req, res, next) => {
    try {
        let response = await service.createFood(req.body);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=foods.router.js.map
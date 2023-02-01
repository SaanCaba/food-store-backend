import express, { Request } from 'express';
import { type } from 'os';
import { nextTick } from 'process';
import { validateHandler } from '../middlewares/validator.handler';
import { getTypeSchema } from '../schemas/foods.schema';
import FoodService from '../services/FoodsService';
const router = express.Router()

const service = new FoodService();

router.get('/', (req,res)=>{
    return res.status(200).json(service.getAllFoods());
})

router.get('/filter', 
    validateHandler(getTypeSchema, 'query'),
    (req : Request,res, next)=>{
    try {
        const {type} : any= req.query;
        let foodsType = service.getTypeOfFood(type)
        return res.status(200).json(foodsType)
    } catch (error) {
        next(error);
    }

})


router.get('/:id', (req: Request,res, next)=>{
    try {
        const {id} = req.params;
        let food = service.findOneFood(id)
        return res.status(200).json(food);
    } catch (error) {
        next(error)
    }

})













export default router;
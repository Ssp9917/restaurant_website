import express from 'express';
import { addTable, getAllTable } from '../controllers/table.controller.js';


const tableRoute = express.Router();

tableRoute.get('/getAllTable',getAllTable);
tableRoute.post('/add',addTable)


export default tableRoute;

import { Router } from "express";
import ProductosController from "../controller/ProductosController";


const routes = Router();

routes.get('', ProductosController.getProductos);
routes.get('/getCodigo/:id', ProductosController.getCodigo);
// routes.post('', ProductosController.add);

export  default routes;
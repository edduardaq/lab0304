import { Router } from "express";
import ProveedoresController from "../controller/ProveedoresController";


const routes = Router();

routes.get('', ProveedoresController.getProveedores);
routes.get('/getProveedor/:id', ProveedoresController.getProveedor);


export  default routes;
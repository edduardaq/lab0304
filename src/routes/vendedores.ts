import { Router } from "express";
import VendedoresController from "../controller/VendedoresController";



const routes = Router();

routes.get('', VendedoresController.getVendedores);
routes.get('/getVendedor/:id', VendedoresController.getVendedor);


export  default routes;
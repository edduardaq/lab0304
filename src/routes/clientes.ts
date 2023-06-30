import { Router } from "express";
import ClientesController from "../controller/ClientesController";



const routes = Router();

routes.get('', ClientesController.getClientes);
routes.get('/getCliente/:id', ClientesController.getCliente);


export  default routes;
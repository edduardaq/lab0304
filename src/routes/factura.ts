import { Router } from "express";
import FacturaController from "../controller/FacturaController";
import addFactura from "../controller/Cabecera_facturaController";
import { Cabecera_factura } from "../entity/Cabecera_factura";
import Cabecera_facturaController from "../controller/Cabecera_facturaController";




const routes = Router();

routes.get('', FacturaController.getAll);
routes.post('', Cabecera_facturaController.add);



export  default routes;
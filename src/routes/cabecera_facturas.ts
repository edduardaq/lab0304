import { Router } from "express";
import Cabecera_facturaController from "../controller/Cabecera_facturaController";




const routes = Router();

// Ruta para obtener todas las facturas con sus detalles y productos relacionados
routes.get("/facturas", Cabecera_facturaController.getCabecera_facturas);

// Ruta para obtener una factura específica con sus detalles y productos relacionados
routes.get("/facturas/:id", Cabecera_facturaController.getCabecera_factura);

// Ruta para agregar una nueva factura
routes.post("/facturas", Cabecera_facturaController.add);

// Ruta para modificar una factura existente
routes.put("/facturas/:id", Cabecera_facturaController.modificarFactura);

// Ruta para eliminar una factura
routes.delete("/facturas/:id", Cabecera_facturaController.eliminarFactura);


export  default routes;
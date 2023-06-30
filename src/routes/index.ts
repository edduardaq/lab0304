import { Router } from "express";
import productos from "./productos";
import proveedores from "./proveedores";
import vendedores from "./vendedores";
import clientes from "./clientes";
import cabecera_facturas from "./cabecera_facturas";
import factura from "./factura";


const routes = Router();

routes.use('/Producto', productos);
routes.use('/Proveedor', proveedores);
routes.use('/Vendedor', vendedores);
routes.use('/Cliente', clientes);
routes.use('/Cabecera_factura', cabecera_facturas);
routes.use('/Factura', factura);


export default routes;
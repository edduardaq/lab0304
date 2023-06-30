import "reflect-metadata"
import { DataSource } from "typeorm"
import { Producto } from "./entity/Producto"
import { Proveedor } from "./entity/Proveedor"
import { Cliente } from "./entity/Cliente"
import { Vendedor } from "./entity/Vendedor"
import { Cabecera_factura } from "./entity/Cabecera_factura"
import { Detalle_factura } from "./entity/Detalle_factura"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "pruebautn",
    synchronize: true,
    logging: false,
    entities: [Producto, Proveedor, Cliente, Vendedor, Cabecera_factura, Detalle_factura],
    migrations: [],
    subscribers: [],
})

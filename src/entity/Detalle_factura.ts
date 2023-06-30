import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cabecera_factura } from "./Cabecera_factura";
import { Producto } from "./Producto";

@Entity()
export class Detalle_factura{

    @PrimaryColumn({unique: true, nullable: false })
    Numero: number;
  
    @PrimaryColumn({unique: true, nullable: false })
    Codigo_producto: number;

    @Column()
    Cantidad: number;


    @ManyToOne(() => Cabecera_factura, cabecera_factura => cabecera_factura.detalle_factura)
    @JoinColumn({ name: 'Numero' })
    cabecera_factura: Cabecera_factura;

    

    @ManyToOne(() => Producto, producto => producto.detalle_factura)
    @JoinColumn({ name: 'Codigo_producto' })
    producto: Producto;
    descripcion: any;
    precio: any;
    cabecera: Cabecera_factura;

 
}

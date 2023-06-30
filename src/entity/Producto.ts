import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Proveedor } from "./Proveedor";
import { Detalle_factura } from "./Detalle_factura";

@Entity()
export class Producto{
    @PrimaryColumn()
    Codigo_producto:number;

    @Column({ type: "varchar", length: 200, nullable: false })
    Descripcion_producto:string;

    @Column({nullable: false})
    Precio_producto:number;

    @Column({nullable: false})
    Stock_maximo_producto:number;

    @Column({nullable: false})
    Stock_minimo_producto:number;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
    @JoinColumn({ name: 'Codigo_proveedor' })
    proveedor: Proveedor;

    @OneToMany(() => Detalle_factura, (detalle_factura) => detalle_factura.producto)
    detalle_factura: Detalle_factura[];
}
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Detalle_factura } from "./Detalle_factura";


@Entity()
export class Cabecera_factura{
    @PrimaryColumn({unique: true })
    Numero:number;

    @Column({nullable: false, type: "date"})
    Fecha:Date; 


    @ManyToOne(() => Cliente) 
    @JoinColumn({ name: 'ClienteId' })
    cliente: Cliente


    @ManyToOne(() => Vendedor)
    @JoinColumn({name: 'Codigo_Vendedor'})
    vendedor: Vendedor

    @OneToMany(() => Detalle_factura, (detalle_factura) => detalle_factura.cabecera_factura)
    detalle_factura: Detalle_factura[];
    numeroFactura: any;
    detalles: any[];
    estado: any;
    Ruc_cliente: any;
}


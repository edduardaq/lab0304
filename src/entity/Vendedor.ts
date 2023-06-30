import { Column, Entity, OneToMany, PrimaryColumn, } from "typeorm";
import { Cabecera_factura } from "./Cabecera_factura";


@Entity()
export class Vendedor{
    @PrimaryColumn({ unique: true})
    Codigo_vendedor:number;

    @Column({ type: "varchar", length: 75, nullable: false })
    Nombres_vendedor:string;

    @Column({ type: "varchar", length: 75, nullable: false })
    Apellidos_vendedor:string;

    @Column({ type: "varchar", length: 150, nullable: false })
    Direccion_vendedor:string;

    @Column({nullable: false})
    Telefono_vendedor:number;
    
    @Column({nullable: false})
    Celular_vendedor:number;

    @OneToMany(() => Cabecera_factura, (cabecera_factura) => cabecera_factura.vendedor)
    cabecera_facturas: Cabecera_factura[]
}
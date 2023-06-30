import { Column, Entity, PrimaryColumn, OneToMany} from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class Proveedor{
    @PrimaryColumn({ unique: true })
    Codigo_proveedor:number;

    @Column({ type: "varchar", length: 75, nullable: false })
    Nombres_proveedor:string;

    @Column({ type: "varchar", length: 75, nullable: false })
    Apellidos_proveedor:string;

    @Column({ type: "varchar", length: 100, nullable: false })
    Direccion_proveedor:string;

    @Column({ type: "varchar", length: 75, nullable: false})
    Provincia_proveedor:string;

    @Column({nullable: false})
    Telefono_proveedor:number;

    @OneToMany(() => Producto, (producto) => producto.proveedor)
    productos: Producto[]
}
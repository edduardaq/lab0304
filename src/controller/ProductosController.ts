import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";


class ProductosController{


    static getProductos = async (req:Request, resp:Response)=>{

        try{

            const productosRepo=AppDataSource.getRepository(Producto);

        const listaProductos = await productosRepo.find();

        if(listaProductos.length==0){

            return resp.status(404).json({mensaje:'No se encontró resultados'});
        }

        return resp.status(200).json({listaProductos});

        } catch(error){
            return resp.status(400).json({mensaje:error});
        }
        
    }

     static getCodigo = async (req: Request, resp: Response) => {
        try {
            const Codigo_producto = parseInt(req.params["id"]);
            if (!Codigo_producto) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            const productosRepo = AppDataSource.getRepository(Producto);
            let producto;

            try {

                 producto = await productosRepo.findOneOrFail({ where: { Codigo_producto } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            }
            

            return resp.status(200).json({ producto })
        } catch (error) {
    
            return resp.status(400).json({ mensaje: error.error });
        }




    }







}
        



export default ProductosController;
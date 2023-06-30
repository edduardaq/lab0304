import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Proveedor } from "../entity/Proveedor";



class ProveedoresController{

static getProveedores = async (req:Request, resp:Response)=>{

    try{

        const proveedoresRepo=AppDataSource.getRepository(Proveedor);

    const listaProveedores = await proveedoresRepo.find();

    if(listaProveedores.length==0){

        return resp.status(404).json({mensaje:'No se encontró resultados'});
    }

    return resp.status(200).json({listaProveedores});


    } catch(error){
        return resp.status(400).json({mensaje:error});
    }
    
}

static getProveedor = async (req: Request, resp: Response) => {
    try {
        const Codigo_proveedor = parseInt(req.params["id"]);
        if (!Codigo_proveedor) {
            return resp.status(404).json({ mensaje: 'No se indica el ID' })
        }
        const productosRepo = AppDataSource.getRepository(Proveedor);
        let proveedor;

        try {

             proveedor = await productosRepo.findOneOrFail({ where: { Codigo_proveedor } })
        } catch (error) {
            return resp.status(404).json({ mensaje: 'No se encontro el proveedor con ese ID' })
        }
        

        return resp.status(200).json({ proveedor })
    } catch (error) {

        return resp.status(400).json({ mensaje: error.error });
    }




}
}

export default ProveedoresController;
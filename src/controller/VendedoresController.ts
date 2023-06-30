import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vendedor } from "../entity/Vendedor";




class VendedoresController{

static getVendedores = async (req:Request, resp:Response)=>{

    try{

        const vendedoresRepo=AppDataSource.getRepository(Vendedor);

    const listaVendedores = await vendedoresRepo.find();

    if(listaVendedores.length==0){

        return resp.status(404).json({mensaje:'No se encontró resultados'});
    }

    return resp.status(200).json({listaVendedores});


    } catch(error){
        return resp.status(400).json({mensaje:error});
    }
    
}

static getVendedor = async (req: Request, resp: Response) => {
    try {
        const Codigo_vendedor = parseInt(req.params["id"]);
        if (!Codigo_vendedor) {
            return resp.status(404).json({ mensaje: 'No se indica el ID' })
        }
        const vendedoresRepo = AppDataSource.getRepository(Vendedor);
        let vendedor;

        try {

             vendedor = await vendedoresRepo.findOneOrFail({ where: { Codigo_vendedor } })
        } catch (error) {
            return resp.status(404).json({ mensaje: 'No se encontro el vendedor con ese ID' })
        }
        

        return resp.status(200).json({ vendedor })
    } catch (error) {

        return resp.status(400).json({ mensaje: error.error });
    }




}
}

export default VendedoresController;
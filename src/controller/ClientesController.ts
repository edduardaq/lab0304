import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cliente } from "../entity/Cliente";



class ClientesController{


    static getClientes = async (req:Request, resp:Response)=>{

        try{

            const clientesRepo=AppDataSource.getRepository(Cliente);

        const listaClientes = await clientesRepo.find();

        if(listaClientes.length==0){

            return resp.status(404).json({mensaje:'No se encontró resultados'});
        }

        return resp.status(200).json({listaClientes});

        } catch(error){
            return resp.status(400).json({mensaje:error});
        }
        
    }

     static getCliente = async (req: Request, resp: Response) => {
        try {
            const  ClienteId = parseInt(req.params["id"]);
            if (!ClienteId) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            const clientesRepo = AppDataSource.getRepository(Cliente);
            let cliente;

            try {

                 cliente = await clientesRepo.findOneOrFail({ where: {  ClienteId } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el cliente con ese ID' })
            }
            

            return resp.status(200).json({ cliente })
        } catch (error) {
    
            return resp.status(400).json({ mensaje: error.error });
        }




    }







}
        



export default ClientesController;
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Detalle_factura} from "../entity/Detalle_factura";
import { Cabecera_factura } from "../entity/Cabecera_factura";

class FacturaController {

    static getAll = async (req: Request, resp: Response) => {

         
         try {
            const DetFacRepo = AppDataSource.getRepository(Detalle_factura)
            const CabeRepo = AppDataSource.getRepository(Cabecera_factura)
           
            const ListaDetFacRepo = await DetFacRepo.find();
            const ListaCabeRepo = await CabeRepo.find();

          
            if ( ListaCabeRepo.length == 0 && ListaDetFacRepo.length == 0) {
                return resp.status(404).json({ mensaje: 'No existe ninguna factura' })
            }
            return resp.status(200).json([ListaCabeRepo,ListaDetFacRepo]);
        } catch (error) {
          
            return resp.status(400).json({ mensaje: error.error });
        }



    }

    
      
    }





export default FacturaController;
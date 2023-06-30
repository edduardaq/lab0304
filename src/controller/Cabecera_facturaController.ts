import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cabecera_factura } from "../entity/Cabecera_factura";
import { Detalle_factura } from "../entity/Detalle_factura";
import { Producto } from "../entity/Producto";
import { Cliente } from "../entity/Cliente";
import { Vendedor } from "../entity/Vendedor";
import FacturaController from "./FacturaController";

class Cabecera_facturaController {
    
  static getCabecera_facturas = async (req: Request, resp: Response) => {
    try {
      const facturasRepo = AppDataSource.getRepository(Cabecera_factura);
      const listaFacturas = await facturasRepo.find();

      if (listaFacturas.length === 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados" });
      }

      return resp.status(200).json({ listaFacturas });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  }


  static add = async (req: Request, resp: Response) => {
    try {
      const {
        Numero,
        Fecha,
        Ruc_Cliente,
        Estado,
        Codigo_vendedor,
        Cantidad,
        Codigo_Productos,
      } = req.body;
      if (!Numero) {
        return resp.status(404).json({ mensaje: "Debe indicar el Numero" });
      }
      if (!Estado) {
        return resp.status(404).json({ mensaje: "Debe indicar el estado" });
      }
      if (!Fecha) {
        return resp.status(404).json({ mensaje: "Debe indicar la fecha" });
      }
      if (!Ruc_Cliente) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Ruc_Cliente" });
      }
      if (!Codigo_vendedor) {
        return resp.status(404).json({ mensaje: "Debe indicar el vendedor" });
      }
      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la Cantidad mayor que 0" });
      }
      if (!Codigo_Productos) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Codigo_Productos" });
      }

      const CabceraRepo = AppDataSource.getRepository(Cabecera_factura);
      const DetalleRepo = AppDataSource.getRepository(Detalle_factura);
      let FacturaCab, FacturaDet;

      FacturaCab = await CabceraRepo.findOne({ where: { Numero } });
      FacturaDet = await DetalleRepo.findOne({ where: { Numero } });

      if (FacturaCab && FacturaDet) {
        return resp
          .status(404)
          .json({ mensaje: "La factura ya existe en la base de datos" });
      }

      let CabFactura = new Cabecera_factura();
      let DetFactura = new Detalle_factura();

      CabFactura.Numero = Numero;
      CabFactura.Fecha = Fecha;
      CabFactura.estado = Estado;
      CabFactura.Ruc_cliente = Ruc_Cliente;
      CabFactura.vendedor = Codigo_vendedor;

      DetFactura.Numero = Numero;
      DetFactura.Cantidad = Cantidad;
      DetFactura.Codigo_producto = Codigo_Productos;

      
      await CabceraRepo.save(CabFactura);
      await DetalleRepo.save(DetFactura);
      return resp.status(200).json({ mensaje: "Producto Creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };



  static getCabecera_factura = async (req: Request, resp: Response) => {
    try {
      const facturaId = req.params.id; // Obtener el ID de la factura desde los parámetros

      // Obtener la factura por su ID junto con sus detalles y las entidades relacionadas
      const cabeceraRepo = AppDataSource.getRepository(Cabecera_factura);
      const cabecera = await cabeceraRepo.findOne(facturaId);

      if (!cabecera) {
        return resp.status(404).json({ mensaje: "Factura no encontrada" });
      }

      return resp.status(200).json({ cabecera });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  }
  
  static modificarFactura = async (req: Request, resp: Response) => {
    try {
      const facturaId = req.params.id; // Obtener el ID de la factura desde los parámetros
      const { numeroFactura, clienteId, vendedorId, detalles } = req.body; // Obtener los datos de la factura desde el cuerpo de la solicitud

      // Obtener la factura por su ID
      const cabeceraRepo = AppDataSource.getRepository(Cabecera_factura);
      const cabecera = await cabeceraRepo.findOne(facturaId, { relations: ["detalles"] });

      // Actualizar los datos de la factura
      cabecera.numeroFactura = numeroFactura;
      cabecera.cliente = clienteId;
      cabecera.vendedor = vendedorId;

      // Obtener los IDs de los detalles existentes en la factura
      const detalleIds = cabecera.detalles.map((detalle) => detalle.id);

      // Eliminar los detalles que no se encuentran en la lista actualizada
      const detallesEliminar = cabecera.detalles.filter((detalle) => !detalleIds.includes(detalle.id));
      await AppDataSource.getRepository(Detalle_factura).remove(detallesEliminar);

      // Actualizar los detalles existentes y agregar nuevos detalles
      const detallesActualizar = cabecera.detalles.filter((detalle) => detalleIds.includes(detalle.id));
      const detallesNuevos = detalles.filter((detalle) => !detalleIds.includes(detalle.id));

      detallesActualizar.forEach((detalle) => {
        const detalleActualizado = detalles.find((d) => d.id === detalle.id);

        if (detalleActualizado) {
          detalle.descripcion = detalleActualizado.descripcion;
          detalle.cantidad = detalleActualizado.cantidad;
          detalle.precio = detalleActualizado.precio;
        }
      });

      const detallesAgregar = detallesNuevos.map((detalleNuevo) => {
        const detalleFactura = new Detalle_factura();
        detalleFactura.descripcion = detalleNuevo.descripcion;
        detalleFactura.Cantidad = detalleNuevo.cantidad;
        detalleFactura.precio = detalleNuevo.precio;
        detalleFactura.cabecera = cabecera;

        return detalleFactura;
      });

      await AppDataSource.getRepository(Detalle_factura).save([...detallesActualizar, ...detallesAgregar]);

      // Guardar los cambios en la factura
      await cabeceraRepo.save(cabecera);

      return resp.status(200).json({ mensaje: "Factura modificada correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  }
  static eliminarFactura = async (req: Request, resp: Response) => {
    try {
      const facturaId = req.params.id; // Obtener el ID de la factura desde los parámetros

      // Obtener la factura por su ID
      const cabeceraRepo = AppDataSource.getRepository(Cabecera_factura);
      const cabecera = await cabeceraRepo.findOne(facturaId);

      if (!cabecera) {
        return resp.status(404).json({ mensaje: "Factura no encontrada" });
      }

      // Realizar las validaciones de reglas de negocio necesarias para eliminar la factura
      // Por ejemplo, verificar si la factura ya ha sido procesada o si cumple ciertas condiciones específicas

      // Si la validación falla, enviar una respuesta de error

      // Si la validación es exitosa, realizar la eliminación lógica de la factura
      cabecera.eliminada = true;
      await cabeceraRepo.save(cabecera);

      return resp.status(200).json({ mensaje: "Factura eliminada correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  }
  static getFacturasConDetalles = async (req: Request, resp: Response) => {
    try {
      const facturasRepo = AppDataSource.getRepository(Cabecera_factura);
      const listaFacturas = await facturasRepo.find({ relations: ["detalles", "detalles.producto"] });

      return resp.status(200).json({ listaFacturas });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  }
}

export default Cabecera_facturaController;

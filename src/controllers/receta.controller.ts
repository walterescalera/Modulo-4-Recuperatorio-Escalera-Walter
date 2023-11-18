import { Request, Response } from "express";
import { User } from "../entity/User";
import { Receta } from "../entity/Receta";

export const getRecetas = async (req: Request, res: Response) => {
  try {
    const recetas = await Receta.find({ relations: ["user"] });

    return res.json(recetas);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getReceta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findOne({ 
      where: { id: parseInt(id) }, 
      relations: ["user"] 
    });

    if (!receta) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    return res.json(receta);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

  export const createReceta = async (req: Request, res: Response) => {
    const receta = req.body;

    try {
      const { id } = req.params;
      const recetaData = req.body;
  
      const user = await User.findOne({
        where: { id: parseInt(id) },
        relations: ["recetas"],
      });
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Crear la nueva receta y asociarla al usuario
      const nuevaReceta = new Receta();
      nuevaReceta.nombre = recetaData.nombre;
      nuevaReceta.descripcion = recetaData.descripcion;
      nuevaReceta.imagen = recetaData.imagen;
      nuevaReceta.ingredientes = recetaData.ingredientes;
      nuevaReceta.preparacion = recetaData.preparacion;
      nuevaReceta.preparacionDeTiempo = recetaData.preparacionDeTiempo;
  
      // Asociar la receta al usuario
      nuevaReceta.user = user;
      await nuevaReceta.save();
  
      return res.status(201).json(nuevaReceta);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const updateReceta = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const recetaData = req.body;
  
      const receta = await Receta.findOne({
        where: { id: parseInt(id) }
      });

      if (!receta) {
        return res.status(404).json({ message: "Receta no encontrada" });
      }
  
      // Actualizar los campos de la receta con los nuevos datos
      receta.nombre = recetaData.nombre || receta.nombre;
      receta.descripcion = recetaData.descripcion || receta.descripcion;
      receta.imagen = recetaData.imagen || receta.imagen;
      receta.ingredientes = recetaData.ingredientes || receta.ingredientes;
      receta.preparacion = recetaData.preparacion || receta.preparacion;
      receta.preparacionDeTiempo = recetaData.preparacionDeTiempo || receta.preparacionDeTiempo;
  
      // Guardar los cambios en la base de datos
      await receta.save();
  
      return res.status(200).json(receta);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const deleteReceta = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const receta = await Receta.findOne({
        where: { id: parseInt(id) }
      });
  
      if (!receta) {
        return res.status(404).json({ message: "Receta no encontrada" });
      }
  
      await Receta.remove(receta);
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
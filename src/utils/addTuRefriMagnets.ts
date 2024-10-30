import { MagnetRefriProps } from "../types";

export const addMagnetToSStorage = (data: MagnetRefriProps) => {
  try {
    const storedMagnets = window.sessionStorage.getItem('magnets');
    let newArrMagnets: MagnetRefriProps[] = [];

    if (storedMagnets) {
      newArrMagnets = JSON.parse(storedMagnets);
    }

    const exists = newArrMagnets.some(magnet => magnet.id === data.id);
    if (exists) {
      console.log("El imán ya existe en sessionStorage.");
      return { save: false, cause: 'already exists' };
    }

    newArrMagnets.push(data);
    window.sessionStorage.setItem('magnets', JSON.stringify(newArrMagnets));
    
    return { save: true };
  } catch (error) {
    console.error("Error al agregar el imán a sessionStorage:", error);
    return { save: false, cause: 'error' };
  }
};

export const removeMagnetFromSStorage = (id: number) => {
  try {
    const storedMagnets = window.sessionStorage.getItem('magnets');
    let newArrMagnets: MagnetRefriProps[] = [];

    if (storedMagnets) {
      newArrMagnets = JSON.parse(storedMagnets);
    }
    const filteredMagnets = newArrMagnets.filter(magnet => magnet.id !== id);
    if (filteredMagnets.length === newArrMagnets.length) {
      console.log("No se encontró el imán con el id especificado.");
      return { removed: false, cause: 'not found' };
    }
    window.sessionStorage.setItem('magnets', JSON.stringify(filteredMagnets));
    
    return { removed: true };
  } catch (error) {
    console.error("Error al eliminar el imán de sessionStorage:", error);
    return { removed: false, cause: 'error' };
  }
};

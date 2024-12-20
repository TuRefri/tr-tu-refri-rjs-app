import { Color } from "../types";
export const checkUserFridgeColor = (fridgeColor: Color): Color | null => {
    if (fridgeColor) {
      try {
        // Validar que fridgeColor tiene todas las propiedades necesarias
        if (
          typeof fridgeColor.name === "string" &&
          typeof fridgeColor.hexColor === "string" &&
          typeof fridgeColor.shadow === "string" &&
          typeof fridgeColor.textPrimaryColor === "string" &&
          typeof fridgeColor.textSecondaryColor === "string" &&
          typeof fridgeColor.border === "string" &&
          typeof fridgeColor.cardBackground === "string"
        ) {
          return fridgeColor as Color;
        }
      } catch (error) {
        console.error("Error parsing fridgeColor:", error);
      }
    }
    return null; // Retorna null si el valor no es válido
  };
  
interface Position {
    lat: number;
    lng: number;
  }
  
  interface handleIsOnRadiusProps {
    userPosition: { latitude: number, longitude: number}
    locations: any[];
    radius: number; // En metros
  }
  
  // Fórmula Haversine para calcular distancia entre dos puntos geográficos
  const haversineDistance = (pos1: Position, pos2: Position): number => {
    const R = 6371e3;
    const toRadians = (angle: number) => (angle * Math.PI) / 180;
  
    const dLat = toRadians(pos2.lat - pos1.lat);
    const dLng = toRadians(pos2.lng - pos1.lng);
  
    const lat1 = toRadians(pos1.lat);
    const lat2 = toRadians(pos2.lat);
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  };
  
  export const handleIsOnRadius = (data: handleIsOnRadiusProps) => {
    const { userPosition, locations, radius} = data;
  
    const filteredLocations = locations.filter((location) => {
      const locationPosition = {
        lat: location.longitud,
        lng: location.latitude,
      };
  
      const distance = haversineDistance({lat: userPosition.latitude, lng: userPosition.longitude}, locationPosition);
      return distance <= radius;
    });
  
    return filteredLocations;
  };
  
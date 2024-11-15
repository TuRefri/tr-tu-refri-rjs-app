import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/global-context';

export default function UserPositionMarker({ map }) {
  const { position } = useGlobalContext();

  useEffect(() => {
    if (position && map) {
      const { latitude, longitude } = position;
      map.panTo({ lat: latitude, lng: longitude })

      // Crear marcador
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Tu ubicación',
      });

      // Cambiar la posición del marcador si `position` cambia
      const listener = map.addListener('center_changed', () => {
        marker.setPosition(new google.maps.LatLng(latitude, longitude));
      });

      // Limpiar el marcador cuando el componente se desmonte
      return () => {
        marker.setMap(null);
        google.maps.event.removeListener(listener); // Eliminar listener al desmontar
      };
    }
  }, [position, map]); // Este efecto se ejecutará cuando `position` o `map` cambien

  return null;
}

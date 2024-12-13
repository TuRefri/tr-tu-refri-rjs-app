import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/global-context';

export default function UserPositionMarker({ map }) {
  const { position, handleUpdatePosition } = useGlobalContext();
  const staticPosition = JSON.parse(window.localStorage.getItem('aprox_position'));
  
  // Usar una referencia para almacenar el marcador, así no se recrea cada vez
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || !(position || staticPosition)) return; // Verifica que el mapa esté listo
  
    const desiredPositionToUse = position || staticPosition;
  
    if (!markerRef.current) {
      markerRef.current = new google.maps.Marker({
        position: { lat: desiredPositionToUse.latitude, lng: desiredPositionToUse.longitude },
        map,
        draggable: true,
        icon: {
          url: '/icons/user-position/current_location_2.png',
          scaledSize: new window.google.maps.Size(50, 50),
          anchor: new window.google.maps.Point(25, 25),
        },
        title: 'Tu ubicación',
      });
  
      markerRef.current.addListener("dragend", () => {
        const newPosition = markerRef.current.getPosition();
        handleUpdatePosition(newPosition.lat(), newPosition.lng());
      });
    }
  
    const newPosition = { lat: desiredPositionToUse.latitude, lng: desiredPositionToUse.longitude };
    markerRef.current.setPosition(newPosition);
  
    if (position === desiredPositionToUse) {
      map.panTo(newPosition);
    }
  }, [map, position, staticPosition, handleUpdatePosition]);

  return null;
}

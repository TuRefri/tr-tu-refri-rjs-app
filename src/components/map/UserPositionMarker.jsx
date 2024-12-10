import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/global-context';

export default function UserPositionMarker({ map }) {
  const { position, handleUpdatePosition } = useGlobalContext();
  const staticPosition = JSON.parse(window.localStorage.getItem('aprox_position'));
  
  // Usar una referencia para almacenar el marcador, así no se recrea cada vez
  const markerRef = useRef(null);

  useEffect(() => {
    if ((position || staticPosition) && map) {
      const desiredPositionToUse = position ? position : staticPosition;

      // Si el marcador no está creado, crearlo
      if (!markerRef.current) {
        markerRef.current = new google.maps.Marker({
          position: { lat: desiredPositionToUse.latitude, lng: desiredPositionToUse.longitude },
          map: map,
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

      // Mover el marcador si la posición cambia
      const newPosition = { lat: desiredPositionToUse.latitude, lng: desiredPositionToUse.longitude };
      markerRef.current.setPosition(newPosition);

      // Centrar el mapa en la nueva posición
      if(position === desiredPositionToUse){
        map.panTo(newPosition);
      }

      // Limpiar el marcador cuando el componente se desmonte
     /*  return () => {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
      }; */
    }
  }, [position, staticPosition, map, handleUpdatePosition]);

  return null;
}

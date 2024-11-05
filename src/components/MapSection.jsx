import React, { useEffect, useRef } from "react";
import stores from '../data/stores.json';

const MapSection = () => {
  const mapRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const storedStores = sessionStorage.getItem("user_stores");
    const allStores = [...stores, storedStores];
    if (initializedRef.current) return;
    initializedRef.current = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_MAPS_API_KEY}&callback=initMap&libraries=marker`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = async () => {
      const { Map, InfoWindow } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const map = new Map(mapRef.current, {
        center: { lat: 4.714282070917252, lng: -74.07457617274594 },
        zoom: 17,
        mapId: "90f87356969d889c",
      });

      // Crear un InfoWindow que será reutilizado para cada marcador
      const infoWindow = new InfoWindow();

      allStores.forEach(item => {
        const imgElement = document.createElement("img");
        imgElement.src = `/images/logo/${item.image}`;
        imgElement.style.width = "40px";
        imgElement.style.padding = "2px"
        imgElement.style.backgroundColor ="#000" 
        imgElement.style.height = "40px"; 
        imgElement.style.borderRadius = "50%"; 
        imgElement.style.objectFit = "cover"; 

        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: item.lat, lng: item.lng },
          content: imgElement,
          title: "Marcador con imagen PNG",
        });

        // Añadir evento de clic al marcador para mostrar InfoWindow
        marker.addListener("click", () => {
          infoWindow.setContent(item.name); // Muestra el nombre del marcador
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="map" ref={mapRef} style={{ height: "100vh", width: "100%" }} />
      <script src="https://use.fontawesome.com/releases/v6.2.0/js/all.js"></script>
    </div>
  );
};

export default MapSection;

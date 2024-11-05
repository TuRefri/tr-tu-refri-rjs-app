/* global google */
import React, { useEffect, useRef, useContext, useState } from "react";

const MapSection = () => {
  const mapRef = useRef(null);
  const initializedRef = useRef(false); // Prevent re-initialization
  const [position, setPosition] = useState(null); // Store the current position

  useEffect(() => {
    if (initializedRef.current) return; // Prevent re-initialization
    initializedRef.current = true;

          initializeMap();
  }, []);

  const initializeMap = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDvCNmIs27OFIA6pb5hHIl1QgaBtN6YnAc&callback=initMap`;

    /* REACT_APP_API_KEY=AIzaSyDvCNmIs27OFIA6pb5hHIl1QgaBtN6YnAc
REACT_APP_LAT="-26.816195842959065"
REACT_APP_LNG="-65.22364065207124" */

    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: {lat: -26.816195842959065, lng: -65.22364065207124},
        zoom: 16,
        heading: 0,
        tilt: 0,
        mapId: "90f87356969d889c",
      });

      new google.maps.Marker({
        position: position,
        map: map,
        title: "Your Location",
      });

      [{ lat: -26.8136661775441, lng: -65.2239105409917 }, { lat: -26.815369860810275, lng: -65.22009264144549 }].forEach(step => {
        new google.maps.Marker({
          position: step,
          map: map,
          title: "Step Marker",
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  };

  return (
    <div>
      <div id="map" ref={mapRef} style={{ height: "100vh", width: "100%" }} />
    </div>
  );
};

export default MapSection;

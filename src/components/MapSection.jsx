import React, { useState, useEffect, useRef } from "react";
import { useFridgeContext } from "../context/fridge-color-context";
import UserPositionMarker from './map/UserPositionMarker.jsx'
import LocationsToShowInMap from './map/LocationsToShowInMap.jsx'
import SearchBarMap from './map/SearchBarMap'
const MapSection = (props) => {
  const {handleCloseModal, handleSelectStoreOnMap} = props
  const { refriDim } = useFridgeContext()
  const [map, setMap] = useState(null)
  const [loading , setLoading] = useState(false)
  const mapRef = useRef(null);
  const initializedRef = useRef(false);
  useEffect(() => {
    setLoading(true)
    if (initializedRef.current) return;
    initializedRef.current = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_MAPS_API_KEY}&callback=initMap&libraries=marker`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const map = new Map(mapRef.current, {
        center: { lat: 4.597481838468723, lng: -74.07294921612525 },
        zoom: 16,
        mapId: "90f87356969d889c",
        disableDefaultUI: true,
        
      });
      setMap(map)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative">
     {/*  {loading && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-gray-400 bg-opacity-50 ">
          <div className="animate-spin h-8 w-8 border-4 border-gray-800 border-t-transparent rounded-full"/>
        </div>
      )} */}
      <div className="absolute bottom-20 right-6 z-20">
        <SearchBarMap />
      </div>
      <div id="map" ref={mapRef} style={{ height: `${refriDim.height}px`, width: "100%" }} />
      <script src="https://use.fontawesome.com/releases/v6.2.0/js/all.js"></script>
      <UserPositionMarker map={map}/>
      <div className="absolute top-8 inset-x-0 mx-auto z-10 w-fit">
        <LocationsToShowInMap 
          map={map} 
          handleCloseModal={handleCloseModal} 
          handleSelectStoreOnMap={handleSelectStoreOnMap} 
        />
      </div>
    </div>

  );
};

export default MapSection;

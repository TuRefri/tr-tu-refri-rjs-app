import React, { useState, useEffect, useRef } from "react";
import stores from '../data/stores.json';
import { CgSpinner } from "react-icons/cg";
import { useFridgeContext } from "../context/fridge-color-context";
import { useGlobalContext } from "../context/global-context"
import UserPositionMarker from './UserPositionMarker.jsx'
const MapSection = (props) => {
  const {handleCloseModal, handleSelectStoreOnMap} = props
  const { refriDim } = useFridgeContext()
  const [map, setMap] = useState(null)
  const [loading , setLoading] = useState(false)
  const mapRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    console.log(refriDim)
    setLoading(true)
    const storedStores = sessionStorage.getItem("user_stores");
    const allStores = [...stores, storedStores];

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
        center: { lat: 4.714282070917252, lng: -74.07457617274594 },
        zoom: 17,
        mapId: "90f87356969d889c",
        disableDefaultUI: true,
      });

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
        setMap(map)
        setTimeout(() => {
          setLoading(false)
        }, 2000);
        marker.addListener("click", () => {
          handleCloseModal()
          setTimeout(() => {
            
            handleSelectStoreOnMap(item)
          }, 50);
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-gray-400 bg-opacity-50 ">
          <div className="animate-spin h-8 w-8 border-4 border-gray-800 border-t-transparent rounded-full"/>
        </div>
      )}
      <div id="map" ref={mapRef} style={{ height: `${refriDim.height}px`, width: "100%" }} />
      <script src="https://use.fontawesome.com/releases/v6.2.0/js/all.js"></script>
      <UserPositionMarker map={map}/>
    </div>

  );
};

export default MapSection;

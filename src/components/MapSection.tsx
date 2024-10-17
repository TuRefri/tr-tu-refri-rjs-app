import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useFridgeContext } from '../context/fridge-color-context';

const center = {
  lat: 4.713999076215071, 
  lng: -74.06729017635367 
};
export default function MapSection() {
  const { refriDim } = useFridgeContext();

  const mapContainerStyle = {
    height: `${refriDim.height}px`,
    width: `${refriDim.width}px`
  };
  
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDvCNmIs27OFIA6pb5hHIl1QgaBtN6YnAc"
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

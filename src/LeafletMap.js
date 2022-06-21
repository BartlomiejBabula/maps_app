import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RoutineMachine from "./RoutineMachine";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 38],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = ({ height, width, position, route }) => {
  const mapRef = useRef(null);
  const [mapPosition, setMapPosition] = useState(
    position || [52.2319581, 21.0067249]
  );
  const [mapZoom, setMapZoom] = useState(position ? 17 : 10);

  useEffect(() => {
    if (position !== undefined) {
      mapRef.current?.flyTo(position, 17);
      setMapZoom(17);
      setMapPosition([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <MapContainer
      ref={mapRef}
      center={mapPosition}
      zoom={mapZoom}
      style={{ height: height, width: width }}
    >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {!route && <Marker position={mapPosition}></Marker>}

      {route && <RoutineMachine points={route} />}
    </MapContainer>
  );
};

export default LeafletMap;

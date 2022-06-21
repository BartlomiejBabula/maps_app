import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ points }) => {
  let showPoints = points.map((point, index) => {
    return L.latLng(point.coordinates.lat, point.coordinates.lng);
  });

  const instance = L.Routing.control({
    waypoints: showPoints,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    hide: true,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

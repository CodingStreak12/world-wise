/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CityContext";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={() => getPosition()}>
          {isLoadingPosition ? "Loading" : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngTuple } from "leaflet";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

interface prop {
  latlng: [LatLngTuple, Dispatch<SetStateAction<LatLngTuple>>];
}

interface TypeE {
  lat: number;
  lng: number;
}

function DraggableMarker({ latlng }: prop) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = latlng;
  const markerRef = useRef<any>(null);
  const customLocIcon = new Icon({
    iconUrl:
      "https://www.iconpacks.net/icons/2/free-location-pin-icon-2965-thumb.png",
    iconSize: [32, 32],
  });

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      let location: TypeE = e.latlng;
      setPosition([location.lat, location.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    [],
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d: any) => !d);
  }, []);

  return (
    <Marker
      icon={customLocIcon}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

export default function Map({ latlng }: prop) {
  return (
    <MapContainer
      center={[13.08268, 80.270721]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full"
    >
      <TileLayer
        attribution={
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker latlng={latlng} />
    </MapContainer>
  );
}

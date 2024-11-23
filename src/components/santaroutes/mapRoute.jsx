import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GiftIcon } from 'lucide-react';
import PropTypes from 'prop-types';

// Custom Christmas tree icon
const christmasIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function ChangeView({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);
  return null;
}

ChangeView.propTypes = {
  bounds: PropTypes.instanceOf(L.LatLngBounds)
};

export default function MapRoute({ currentRoute, routeCoordinates, northPole }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([northPole.lat, northPole.lng], 5);
    }
  }, [northPole]); 

  const bounds = currentRoute 
    ? L.latLngBounds([northPole, [parseFloat(currentRoute.lat), parseFloat(currentRoute.lng)]])
    : null;

  return (
    <div className='shadow-lg shadow-zinc-500 rounded-xl overflow-hidden'>
      <MapContainer
        center={[northPole.lat, northPole.lng]}
        zoom={5}
        style={{ height: '75vh', width: '100%', borderRadius: '10px' }}
        ref={mapRef}
        className="rounded-3xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[northPole.lat, northPole.lng]} icon={christmasIcon}>
          <Popup>{northPole.name} - Santa&apos;s Workshop</Popup>
        </Marker>
        {currentRoute && (
          <Marker position={[parseFloat(currentRoute.lat), parseFloat(currentRoute.lng)]} icon={christmasIcon}>
            <Popup>
              <div className="flex items-center">
                <GiftIcon className="mr-2 text-red-700" />
                {currentRoute.name}
              </div>
            </Popup>
          </Marker>
        )}
        {routeCoordinates && (
          <Polyline
            positions={routeCoordinates}
            color="red"
            weight={3}
            opacity={0.7}
          >
            <Popup>Route from {northPole.name} to {currentRoute?.name}</Popup>
          </Polyline>
        )}
        <ChangeView bounds={bounds} />
      </MapContainer>
    </div>
  );
}

MapRoute.propTypes = {
  currentRoute: PropTypes.shape({
    name: PropTypes.string,
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  routeCoordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  northPole: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    name: PropTypes.string
  }).isRequired
};
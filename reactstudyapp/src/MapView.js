import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default marker icon
const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

function MapView({ markers, onMarkerClick }) {
    return (
        <MapContainer center={[48.7758, 9.1829]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map(marker => (
                <Marker
                    key={marker.id}
                    position={marker.position}
                    icon={defaultIcon}
                    eventHandlers={{
                        click: () => {
                            onMarkerClick(marker);
                        }
                    }}
                >
                    <Popup>{marker.title}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapView;

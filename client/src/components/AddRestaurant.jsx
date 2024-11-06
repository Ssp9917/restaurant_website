// src/components/AddRestaurant.js
import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configure Leaflet marker icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [rating, setRating] = useState(0);
    const [location, setLocation] = useState([12.9716, 77.5946]); // Default to Bangalore
    const [searchTerm, setSearchTerm] = useState('');

    // Custom hook to update map center
    const SetMapCenter = ({ coords }) => {
        const map = useMap();
        map.setView(coords, 13);
        return null;
    };

    // Geocode function to convert search term to coordinates
    const handleSearch = async () => {
        if (!searchTerm) return;
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: searchTerm,
                    format: 'json',
                    limit: 1,
                },
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const coords = [parseFloat(lat), parseFloat(lon)];
                setLocation(coords);
            } else {
                alert('Location not found. Please try another search term.');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            alert('Error finding location.');
        }
    };

    // Use current location
    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = [position.coords.latitude, position.coords.longitude];
                    setLocation(coords);
                },
                (error) => {
                    alert('Unable to retrieve your location.');
                    console.error(error);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    // Draggable marker for map
    const DraggableMarker = () => {
        const [draggable, setDraggable] = useState(true);

        const markerRef = React.useRef(null);
        const eventHandlers = {
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
                }
            },
        };

        useMapEvents({
            click(event) {
                setLocation([event.latlng.lat, event.latlng.lng]);
            },
        });

        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={location}
                ref={markerRef}
            />
        );
    };

    // Submit handler to add a restaurant
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/restaurants/add', {
                name,
                address,
                cuisine,
                rating,
                coordinates: location,
            });
            console.log('Restaurant added:', response.data);
            alert('Restaurant added successfully!');
        } catch (error) {
            console.error('Error adding restaurant:', error);
            alert('Failed to add restaurant');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Restaurant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Cuisine:</label>
                    <input
                        type="text"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Rating:</label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                {/* Search bar for location */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Search Location:</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter a location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-200"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition duration-200 my-4"
                >
                    Use My Current Location
                </button>

                <div className="mt-4">
                    <p className="text-gray-600 font-medium mb-2">Click on the map or drag the marker to select location:</p>
                    <MapContainer
                        center={location}
                        zoom={13}
                        style={{ height: '300px', width: '100%', borderRadius: '8px' }}
                        className="shadow-md border border-gray-300"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <DraggableMarker />
                        <SetMapCenter coords={location} />
                    </MapContainer>
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
                >
                    Add Restaurant
                </button>
            </form>
        </div>
    );
};

export default AddRestaurant;

import React, { useState } from 'react';
import axios from '../config/axiosConfig';

const SearchRestaurants = () => {
    const [query, setQuery] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    // Function to get the user's current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLongitude(position.coords.longitude);
                setLatitude(position.coords.latitude);
            }, (error) => {
                console.error("Error fetching location:", error);
                alert("Unable to retrieve your location. Please enter it manually.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const searchRestaurants = async () => {
        try {
            const response = await axios.get('/restaurants/search', {
                params: { query, longitude, latitude },
            });
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    return (
        <div>
            <h2>Search Restaurants</h2>
            <input
                type="text"
                placeholder="Enter restaurant name or location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={getCurrentLocation}>Use My Current Location</button>
            <button onClick={searchRestaurants}>Search</button>

            {longitude && latitude && (
                <div>
                    <p>Your Location: Latitude: {latitude}, Longitude: {longitude}</p>
                </div>
            )}

            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant._id}>
                        {restaurant.name} - {restaurant.address}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchRestaurants;

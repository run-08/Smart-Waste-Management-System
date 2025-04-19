import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const libraries = ["places", "directions"];

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [destinationInput, setDestinationInput] = useState("");
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchPlaces = (map) => {
    const placeService = new google.maps.places.PlacesService(map);
    const request = {
      location: map.getCenter(),
      radius: 50000,
      type: ["restaurant", "hotel", "gas_station", "bus_station", "park"],
    };
    placeService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const newMarkers = results.map((place) => ({
          id: place.place_id,
          position: place.geometry.location,
          name: place.name,
          type: place.types[0],
        }));
        setMarkers(newMarkers);
      }
    });
  };

  const onMapLoad = (map) => {
    fetchPlaces(map);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleDestinationChange = (e) => {
    setDestinationInput(e.target.value);
  };

  const geocodeDestination = (address, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        callback({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        console.error("Geocode failed:", status);
      }
    });
  };

  const findOptimizedPath = () => {
    if (!currentLocation || !destinationInput) return;

    geocodeDestination(destinationInput, (destinationLatLng) => {
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: currentLocation,
        destination: destinationLatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      });

      setDestination(destinationLatLng);
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBLz5KhOZZQi8I5_tbmVscOPN5H3mkRu_I"
      libraries={libraries}
    >
      <div>
        <input
          type="text"
          value={destinationInput}
          onChange={handleDestinationChange}
          className="mx-5 my-5 form-control d-inline fw-bold text-primary"
          placeholder="Enter a destination"
          style={{
            width: window.innerWidth <= 420 ? "200px" : "500px",
            marginLeft: window.innerWidth <= 420 ? "20px" : "0px",
          }}
        />
        <button
          onClick={findOptimizedPath}
          className="btn btn-primary fw-bold me-auto"
          style={{
            marginTop: window.innerWidth <= 420 ? "-50px" : "",
            marginLeft: window.innerWidth <= 420 ? "40px" : "",
          }}
        >
          Find Route
        </button>
      </div>

      <GoogleMap
        id="map"
        mapContainerStyle={{
          width: `100vw`,
          height: "100vh",
        }}
        zoom={14}
        center={currentLocation || { lat: 12.9716, lng: 77.5946 }}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => setSelected(marker)}
            icon={{
              url:
                marker.type === "restaurant"
                  ? "http://maps.google.com/mapfiles/ms/icons/restaurant.png"
                  : marker.type === "hotel"
                  ? "http://maps.google.com/mapfiles/ms/icons/hotel.png"
                  : marker.type === "gas_station"
                  ? "http://maps.google.com/mapfiles/ms/icons/gasstation.png"
                  : marker.type === "bus_station"
                  ? "http://maps.google.com/mapfiles/ms/icons/bus.png"
                  : marker.type === "park"
                  ? "http://maps.google.com/mapfiles/ms/icons/park.png"
                  : "http://maps.google.com/mapfiles/ms/icons/default.png",
            }}
          />
        ))}

        {selected && (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h3>{selected.name}</h3>
              <p>Type: {selected.type}</p>
            </div>
          </InfoWindow>
        )}

        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )}

        {destination && (
          <Marker
            position={destination}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

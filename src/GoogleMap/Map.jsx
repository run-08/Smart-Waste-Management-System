import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const Map = () => {
  const apiKey = "AIzaSyBLz5KhOZZQi8I5_tbmVscOPN5H3mkRu_I";
  const [center, setCenter] = useState({
    lat: 13.0827,
    lng: 80.2707,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fuelStations, setFuelStations] = useState(null);

  const mapContainerStyle = {
    width: "80%",
    height: "880px",
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCenter({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const handleDestination = async (e) => {
    e.preventDefault();
    if (!destination) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          destination
        )}&key=${apiKey}`
      );
      const data = await response.json();
      if (data?.results && data.results.length > 0) {
        const location = data?.results[0].geometry.location;
        setDestinationCoords(location);
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: center,
            destination: location,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);
              const routes = result?.routes[0];
              if (routes && routes.legs.length > 0) {
                const leg = routes.legs[0];
                setDistance(leg.distance.text);
                const midPointLat =
                  (leg.start_location.lat() + leg.end_location.lat()) / 2;
                const midPointLng =
                  (leg.start_location.lng() + leg.end_location.lng()) / 2;
                const service = new window.google.maps.places.PlacesService(
                  document.createElement("div")
                );
                service.nearbySearch(
                  {
                    location: { lat: midPointLat, lng: midPointLng },
                    radius: 10000,
                    type: "gas_station",
                  },
                  (results, status) => {
                    if (
                      status == window.google.maps.places.PlacesServiceStatus.OK
                    ) {
                      setFuelStations(results);
                    } else {
                      ``;
                      console.log(
                        "Failed to Fetch The Gas Stations : ",
                        status
                      );
                    }
                  }
                );
              }
            } else {
              console.error("Directions request failed due to " + status);
            }
          }
        );
      } else {
        alert("No location found!");
      }
    } catch (e) {
      console.log("An Unknown Error Occurred!" + e);
      alert("Unknown Error Occurred!");
    }
  };

  return (
    <div className="google_map row mt-5 py-5">
      <div className="destinationPlace">
        <label htmlFor="destination " className="display-6 fw-bold px-3">
          Destination:{" "}
        </label>
        <input
          id="destination"
          type="text"
          placeholder="Enter Your destination"
          className="form-control w-25 px-3 my-4 fw-bold"
          onChange={(e) => {
            setDestination(e?.target.value.trim());
          }}
        />
        <button
          className="btn btn-outline-info"
          onClick={(e) => handleDestination(e)}
        >
          <span className="h5">Go</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="black"
            className="mx-2"
          >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </button>
        <h1 className="display-6">Distance : {distance}</h1>
      </div>
      <div className="col-8 offset-3 text-center px-5 ml-5">
        <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={center}
          >
            <Marker position={center}></Marker>
            {destinationCoords && <Marker position={destinationCoords} />}
            {directions && <DirectionsRenderer directions={directions} />}
            {fuelStations != null &&
              fuelStations.map((station, idx) => (
                <Marker
                  key={idx}
                  position={{
                    lat: station.geometry.location.lat(),
                    lng: station.geometry.location.lng(),
                  }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/gas.png",
                  }}
                  title={station.name}
                  onClick={() => setSelectedStation(station)}
                />
              ))}
            {selectedStation && (
              <InfoWindow
                position={{
                  lat: selectedStation.geometry.location.lat(),
                  lng: selectedStation.geometry.location.lng(),
                }}
                onCloseClick={() => setSelectedStation(null)}
              >
                <div>
                  <h6>{selectedStation.name}</h6>
                  <p>{selectedStation.vicinity || "No address available"}</p>
                  {selectedStation.rating && (
                    <p>Rating: {selectedStation.rating} ⭐</p>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Map;

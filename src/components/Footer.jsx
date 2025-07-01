import React, { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import logo from "../assets/logo.png";

function Footer() {
  const markers = [
    { geocode: [52.483333, 13.316667], popUp: "My apartment location" },
    { geocode: [52.50499798, 13.33583199], popUp: "My shop location" },
  ];
  const customIcon = new Icon({
    iconUrl: "../src/assets/map-marker.png",
    iconSize: [38, 38], //size of the icon
  });
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="logo" />
        <h2>My Pet Care</h2>
      </div>
      <div className="map-div">
        <h2 className="map-title">My locations:</h2>
        <MapContainer center={[52.52, 13.405]} zoom={10}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker, index) => {
            return (
              <Marker position={marker.geocode} icon={customIcon} key={index}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </footer>
  );
}

export default Footer;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddPetPage from "./pages/AddPetPage";
import AllPostsPage from "./pages/AllPostsPage";
import AddPostPage from "./pages/AddPostPage";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import marker from "./assets/map-marker.png";

function App() {
  const markers = [
    { geocode: [52.483333, 13.316667], popUp: "My apartment location" },
    { geocode: [52.50499798, 13.33583199], popUp: "My shop location" },
  ];
  const customIcon = new Icon({
    iconUrl: require("../src/assets/map-marker.png"),
    iconsize: [38, 38], //size of the icon
  });
  return (
    <>
      <MapContainer center={[52.52, 13.405]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => {
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>;
        })}
      </MapContainer>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="/all-posts" element={<AllPostsPage />} />
        <Route
          path="/add-pet"
          element={
            <ProtectedRoute>
              <AddPetPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

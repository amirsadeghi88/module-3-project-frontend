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
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const markers = [
    { geocode: [52.483333, 13.316667], popUp: "My apartment location" },
    { geocode: [52.50499798, 13.33583199], popUp: "My shop location" },
  ];
  return (
    <>
      <MapContainer center={[52.52, 13.405]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

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
import UpdatePetPage from "./pages/UpdatePetPage";

function App() {
  return (
    <>
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
        <Route path="/update-pet/:petId" element={<UpdatePetPage />} />
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

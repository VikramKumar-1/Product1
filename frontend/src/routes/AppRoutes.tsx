import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Components/layout/Navbar";
import Login from "../auth/login";
import Signup from "../auth/signup";
import PasswordSetup from "../auth/passwordsetup";
import MainLayout from "../Components/layout/Mainlayout"; 
import Partner from "../form/Partner";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fullscreen auth pages — no Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<PasswordSetup />} />
        <Route path="/become-a-partner" element={<Partner/>} />

        {/* Home page with Navbar + Main content */}
        <Route path="/" element={
          <>
            <Navbar />
            <MainLayout /> {/* ← use it here */}
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
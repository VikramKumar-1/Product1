import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Components/layout/Navbar";
import Login from "../auth/pages/login";
import Signup from "../auth/pages/signup";
import PasswordSetup from "../auth/pages/passwordsetup";
import Partner from "../form/pages/Partner";
import MainLayout from "../Components/layout/Mainlayout";
import SplashScreen from "../Components/layout/SplashScreen";
import Footer from "../Components/layout/Footer"

const AppRoutes = () => {
  const [splashDone, setSplashDone] = useState(() => {
    return sessionStorage.getItem("splashShown") === "true";
  });

  if (!splashDone) {
    return (
      <SplashScreen
        onComplete={() => {
          sessionStorage.setItem("splashShown", "true");
          setSplashDone(true);
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Fullscreen auth pages — no Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<PasswordSetup />} />
        <Route path="/become-a-partner" element={<Partner />} />

        {/* Home page with Navbar + Main content */}
        <Route path="/" element={
          <>
            <Navbar />
            <MainLayout />
            <Footer/>
            
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
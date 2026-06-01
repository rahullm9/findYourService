import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/footer/Footer";
import AuthPage from "./components/Auth/AuthPage";
import ContactUs from "./components/contactUs/ContactUs";
import RegisterWorker from "./components/services/RegisterWorker";
import Dashboard from "./components/Dashboard/Dashboard";
import About from "./components/About/About";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/dashboard" || location.pathname === "/signin";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/services" element={<Navigate to="/#services" replace />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/services/worker" element={<RegisterWorker />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

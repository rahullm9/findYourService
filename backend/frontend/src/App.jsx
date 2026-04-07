import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import UserServices from "./components/services/userServices";
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/footer/Footer";
import AuthPage from "./components/Auth/AuthPage";
import ContactUs from "./components/contactUs/ContactUs";
import RegisterWorker from "./components/services/RegisterWorker";
import Dashboard from "./components/Dashboard/Dashboard";

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/services" element={<UserServices />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/services/worker" element={<RegisterWorker />} />
      </Routes>
      {!isDashboard && <Footer />}
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

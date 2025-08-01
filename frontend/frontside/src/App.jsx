import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserServices from './components/services/userServices'
import Home from './components/Home/Home'
import Navbar from './components/Home/Navbar'
import Footer from './components/Home/footer/Footer'
import AuthPage from './components/Auth/AuthPage'
import ContactUs from './components/contactUs/ContactUs'

const App = () => {
  return (
      <>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/services" element={<UserServices />} />
          <Route path="/signin" element={<AuthPage/>} />
          <Route path="/contactus" element={<ContactUs/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </>
  )
}

export default App

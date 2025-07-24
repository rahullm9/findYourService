import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserServices from './components/services/userServices'
import Home from './components/Home/Home'
import Navbar from './components/Home/Navbar'
import Footer from './components/Home/footer/Footer'

const App = () => {
  return (
    <div>
      <>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/services" element={<UserServices />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </>
    </div>
  )
}

export default App

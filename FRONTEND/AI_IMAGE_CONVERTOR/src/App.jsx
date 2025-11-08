/*
import React, { useContext } from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Result from './Pages/Result'
import Navbar from './Componets/Navbar'
import Footer from './Componets/Footer'
import Steps from './Componets/Steps'
import BuyCredit from './Pages/BuyCredit'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Login from './Componets/Login'

function App() {
  const {showLogin}=useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen  from-teal-50 to-pink-50'>
      <ToastContainer/>
      <Login/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/BuyCredit" element={<BuyCredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
*/

import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Result from "./Pages/Result";
import Navbar from "./Componets/Navbar";
import Footer from "./Componets/Footer";
import BuyCredit from "./Pages/BuyCredit";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Componets/Login";

function App() {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen from-teal-50 to-pink-50">
      <ToastContainer />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/BuyCredit" element={<BuyCredit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

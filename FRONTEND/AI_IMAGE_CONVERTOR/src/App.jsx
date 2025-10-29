import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Result from './Pages/Result'
import Navbar from './Componets/Navbar'
import Footer from './Componets/Footer'

function App() {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen  from-teal-50 to-pink-50'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
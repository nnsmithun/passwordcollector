import { useState } from 'react'
import './App.css'
import Head from './assets/components/Head.jsx'
import Navbar from './assets/components/Navbar.jsx'
import Carrd from './assets/components/Carrd.jsx'
import Footer from './assets/components/Footer.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Head />
      <Navbar />
      <Carrd />
  
      <Footer />
      
    </>
  )
}

export default App

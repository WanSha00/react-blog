import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import TopBar from './components/topbar/TopBar'
import Home from './pages/home/Home'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'

function App() {

  return (
    <>
      <TopBar/>
      <Login/>
      
    </>
  )
}

export default App

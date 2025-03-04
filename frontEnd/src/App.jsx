import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
import { Route, Routes } from 'react-router'
import Carro from './pages/Carros'
import Cadastro from './pages/cadastro'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastrarCarro' element={<Carro />} />
      </Routes>
    </>
  )
}

export default App

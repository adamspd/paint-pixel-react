import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/Homepage'
import Login from './components/Login'
import SignUp from './components/Signup'
import Admin from './components/Admin'
import Template from './components/Template'
import './css/App.css'
import PixelBoardCreate from './components/FormCreatePB'

function App() {
  return (
    <>
    <Template />
    <section className='componentx'>
    <Routes>
        <Route path='/Login' element={<HomePage/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/PixelBoardCreate' element={<PixelBoardCreate/>}/>
    </Routes>
    </section>
    </>
  )
}

export default App
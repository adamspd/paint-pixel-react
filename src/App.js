import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/Homepage'
import Login from './components/Login'
import SignUp from './components/Signup'
import Admin from './components/Admin'
import Template from './components/Template'
import './css/App.css'
import PixelBoardCreate from './components/FormCreatePB'
import RouterProtecter from './RouterProtecter';



function App() {
  const [ isDarkMode, setIsDarkMode] = useState(false);
  return (
    <>
    <Template />
    <section className={isDarkMode ? 'darkmode': 'componentx'}>
    <Routes>

      <Route element={<RouterProtecter />}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/PixelBoardCreate' element={<PixelBoardCreate/>}/>

       </Route>

        <Route path='/Login' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        
    </Routes>
    </section>
    </>
  )
}

export default App
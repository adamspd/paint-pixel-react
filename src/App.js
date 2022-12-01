import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/Homepage'
import Login from './components/Login'
import SignUp from './components/Signup'
import Admin from './components/Admin'
import Template from './components/Template'
import './css/App.css'
import PixelBoardCreate from './components/FormCreatePB'
import RouterProtecter from './RouterProtecter';
import {useContext} from 'react';
import {Theme} from './utils/Theme';

function App() {
  const {theme} = useContext(Theme);
  return (
    <>
    <section className={theme === 'light' ? 'app light' : 'app dark'}>
    <Template />
    <section className={theme === 'dark' ? 'componentx': 'darkmode'}>
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
    </section>
    </>
  )
}

export default App
import React from 'react'
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import './scss/App.css'
import RouterProtecter from './RouterProtecter';
import {useContext} from 'react';
import {Theme} from './utils/Theme';
import {logout} from './utils/utils';
import {Admin, Template, Sidebar, HomePage, SignUp, Login, PixelBoardCreate} from './components'

function App() {
    const navigate = useNavigate();
    const {theme} = useContext(Theme);

    return (
        <>
            <section className={theme === 'light' ? 'app light' : 'app dark'}>
                <section className={theme === 'dark' ? 'componentx' : 'darkmode'}>
                    <Template/>
                    <Routes>
                        <Route element={<RouterProtecter/>}>
                            <Route path='/PixelBoardCreate' element={<PixelBoardCreate/>}/>
                            <Route path='/Admin' element={<Admin/>}/>
                            <Route path='/' element={<HomePage/>}/>
                        </Route>
                        <Route path='/Login' element={<Login/>}/>
                        <Route path='/SignUp' element={<SignUp/>}/>
                    </Routes>
                </section>
            </section>
        </>
    )
}

export default App
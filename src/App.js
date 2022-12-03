import React from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import './css/App.css'
import RouterProtecter from './RouterProtecter';
import {useContext} from 'react';
import {Theme} from './utils/Theme';
import {Admin, Template, Sidebar, HomePage, SignUp, Login, PixelBoardCreate} from './components'

function App() {
    const {theme} = useContext(Theme);
    const SidebarLayout = () => (
        <>
            <Sidebar />
            <Outlet />
        </>
    );

    return (
        <>
            <section className={theme === 'light' ? 'app light' : 'app dark'}>
                <section className={theme === 'dark' ? 'componentx' : 'darkmode'}>
                    <Template/>
                    <Routes>
                        <Route element={<RouterProtecter/>}>
                            <Route path='/PixelBoardCreate' element={<PixelBoardCreate/>}/>
                            <Route path='/' element={<HomePage/>}/>
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
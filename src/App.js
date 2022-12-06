import React from 'react'
import {Route, Routes} from 'react-router-dom'
import './scss/App.css'
import RouterProtecter from './RouterProtecter';
import {useContext} from 'react';
import {Theme} from './utils/Theme';
import {Admin, Template, HomePage, SignUp, Login, PixelBoardCreate} from './components'
import PublicHomePage from './components/PublicHomePage';

function App() {
    const {theme} = useContext(Theme);

    return (
        <>
            <section className={theme === 'light' ? 'app light' : 'app dark'}>
                <section className={theme === 'dark' ? 'componentx' : 'darkmode'}>
                    <Template/>
                    <Routes>
                        <Route path='/' element={<PublicHomePage/>}/>
                        <Route element={<RouterProtecter/>}>
                            <Route path='/PixelBoardCreate' element={<PixelBoardCreate/>}/>
                            <Route path='/admin' element={<Admin/>}/>
                            <Route path='/dashboard' element={<HomePage/>}/>
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
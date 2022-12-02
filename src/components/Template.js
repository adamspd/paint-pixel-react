import React from 'react'
import '../css/template.css'
import {useContext} from 'react';
import {Theme} from '../utils/Theme';


function Template() {
    const {theme} = useContext(Theme);
    return (
        <>
            <section className={theme === 'light' ? 'template light' : 'template dark'}>
                <nav>
                    <h1>Paint Pixel</h1>
                </nav>
                <footer></footer>
            </section>
        </>
    )
}

export default Template
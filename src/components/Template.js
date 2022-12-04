import React from 'react'
import '../css/template.scss'
import {useContext} from 'react';
import {Theme} from '../utils/Theme';


function Template() {
    const {theme} = useContext(Theme);
    return (
        <div>
            <section className={theme === 'light' ? 'template light' : 'template dark'}>
                <nav>
                    <h1>Paint Pixel</h1>
                </nav>
                <footer></footer>
            </section>
        </div>
    )
}

export default Template
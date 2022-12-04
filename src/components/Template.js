import React from 'react'
import '../scss/template.scss'
import {useContext} from 'react';
import {Theme} from '../utils/Theme';
import {Link} from 'react-router-dom'
import {FaPaintRoller} from 'react-icons/fa';


function Template() {
    const {theme} = useContext(Theme);
    return (
        <div>
            <section className={theme === 'light' ? 'template light' : 'template dark'}>
                <nav>
                    <Link to='/'>
                        <h1 className='homepageBanner'>
                            <FaPaintRoller/>&nbsp;
                            Paint Pixel
                        </h1>
                    </Link>
                </nav>
                <footer></footer>
            </section>
        </div>
    )
}

export default Template
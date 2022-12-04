import React from 'react'
import {useNavigate} from "react-router-dom";
import {useContext} from 'react';
import {Theme} from '../utils/Theme';
import PixelBoard from './PixelBoard';
import {logout} from '../utils/utils';
import {Sidebar} from './index'
import '../scss/homepage.scss'

function Homepage(props) {
    let navigate = useNavigate();
    const {theme, ChangeTheme} = useContext(Theme);

    const handeLogout = () => {
        logout();
        navigate('/Login');
    };
    const handeTheme = () => {
        ChangeTheme();
    };

    return (
        <div className="homepage">
            <Sidebar>
                <section>
                    <button onClick={handeLogout}>Logout</button>
                    <button onClick={handeTheme}>Change Theme</button>
                    <PixelBoard/>
                </section>
            </Sidebar>
        </div>
    )
}

export default Homepage
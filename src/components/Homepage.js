import React from 'react'
import {useNavigate} from "react-router-dom";
import {useContext} from 'react';
import {Theme} from '../utils/Theme';
import {logout} from '../utils/utils';
import {Sidebar} from './index'
import '../css/homepage.css'

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
        <Sidebar>
            <section>
                <button onClick={handeLogout}>Logout</button>
                <button onClick={handeTheme}>Change Theme</button>
            </section>
        </Sidebar>
    )
}

export default Homepage
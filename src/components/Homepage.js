import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useContext} from 'react';
import {Theme} from '../utils/Theme';
import PixelBoard from './PixelBoard';
import {logout} from '../utils/utils';
import {Sidebar} from './index'
import '../scss/homepage.scss'
import axios from '../utils/axios';

function Homepage(props) {
    let navigate = useNavigate();
    const {theme, ChangeTheme} = useContext(Theme);
    const [pixelBoard, setPixelBoard] = useState(null);

    /**
     * Setting the page's title
     */
    useEffect(() => {
        document.title = 'Painting Pixel';
    }, []);

    const handeLogout = () => {
        logout();
        navigate('/Login');
    };

    useEffect(() => {
        const username = sessionStorage.getItem('user');
        if (username !== null) {
            axios.get('/pixelboard/byauthor/' + username + '/last').then(
                (response) => {
                    const {pb} = response.data;
                    setPixelBoard(pb[0])
                    console.log(pb[0])
                })
        } else {

        }
    }, []);


    const handeTheme = () => {
        ChangeTheme();
    };

    return (
        <div className="homepage">
            <Sidebar>
                <section>
                    {pixelBoard?.id}
                    <button onClick={handeLogout}>Logout</button>
                    <button onClick={handeTheme}>Change Theme</button>
                    {pixelBoard ? <PixelBoard size={pixelBoard?.boardSize} author={pixelBoard?.author}
                                              title={pixelBoard?.title} p_id={pixelBoard?._id}
                                              pixels={pixelBoard?.pixelBoards}/> :
                        <h1>There is no pixelboard</h1>}
                </section>
            </Sidebar>
        </div>
    )
}

export default Homepage
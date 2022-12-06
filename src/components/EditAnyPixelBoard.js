import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useContext} from 'react';
import {Theme} from '../utils/Theme';
import PixelBoard from './PixelBoard';
import {logout} from '../utils/utils';
import {Sidebar} from './index'
import '../scss/homepage.scss'
import axios from "../utils/axios";

function EditAnyPixelBoard(props) {
    let navigate = useNavigate();
    const {theme, ChangeTheme} = useContext(Theme);
    const [pixelBoard, setPixelBoard] = useState(null);
    // get id from url
    const {id} = useParams();

    /**
     * Setting the page's title
     */
    useEffect(() => {
        document.title = 'Playing with the Pixels';
    }, []);

    const handeLogout = () => {
        logout();
        navigate('/Login');
    };


    const handeTheme = () => {
        ChangeTheme();
    };

    useEffect(() => {
        if (id !== null) {
            axios.get('/pixelboard/get-pb/' + id).then(
                (response) => {
                    setPixelBoard(response.data.data)
                })
        } else {

        }
    }, []);

    return (
        <div className="homepage">
            <Sidebar>
                <section>
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

export default EditAnyPixelBoard
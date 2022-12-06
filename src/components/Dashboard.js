import React, {useContext, useEffect, useState} from "react";
import {Sidebar} from "./index";
import {logout} from "../utils/utils";
import {Link, useNavigate} from "react-router-dom";
import {Theme} from "../utils/Theme";
import axios from "../utils/axios";
import '../scss/dashboard.scss'


function Dashboard() {
    const navigate = useNavigate();
    const {theme, ChangeTheme} = useContext(Theme);
    const [allPixelBoards, setAllPixelBoards] = useState([]);
    const [isAllPixelBoards, setIsAllPixelBoards] = useState(false);
    /**
     * Setting the page's title
     */
    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/Login');
    };

    const handleTheme = () => {
        ChangeTheme();
    };

    /**
     * Get all pixelboards
     */
    useEffect(() => {
        try {
            axios.get('/pixelboard/all/')
                .then(res => {
                    setAllPixelBoards(res.data.data);
                    setIsAllPixelBoards(true);
                }).catch(err => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }, [isAllPixelBoards]);

    return (
        <Sidebar>
            <div className={"container-pb"}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <button onClick={handleLogout}>Logout</button>
                        <button onClick={handleTheme}>Change Theme</button>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <h1>Dashboard</h1>
                    </div>
                    <div className={"col-12"}>
                        {isAllPixelBoards ? (
                            <div className={"col-12"}>
                                <span>
                                    {isAllPixelBoards ? allPixelBoards.map((pb, index) => {
                                        return (
                                            <Link to={{
                                                pathname: `/edit-any-pixel-board/${pb._id}`
                                            }} key={index}>
                                                <div key={index} className={"main-container"}>
                                                <span
                                                    className={"title-pb"}>{pb.title} ({pb.boardSize}x{pb.boardSize})</span>
                                                    <span className={"author-pb"}>Author: {pb.author}</span>
                                                </div>
                                            </Link>
                                        )
                                    }) : null}
                                </span>
                            </div>
                        ) : <h1>There is no pixelboard</h1>}
                    </div>
                </div>

            </div>
        </Sidebar>
    )
        ;
}

export default Dashboard;
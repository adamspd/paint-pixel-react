// if connected, add a sidebar menu
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import '../scss/sidebar.scss';
import {FaBars, FaEdit, FaHome, FaUserCog, FaPaintRoller} from 'react-icons/fa';

const Sidebar = ({children}) => {
    const[isOpened, setIsOpened] = useState(false);
    const toggle = () => setIsOpened(!isOpened);
    const menuItem = [
        {name: 'Home', path: '/dashboard', icon: <FaHome/>},
        {name: 'Paint', path: '/paint', icon: <FaPaintRoller/>},
        {name: 'PixelBoardCreate', path: '/PixelBoardCreate', icon: <FaEdit/>},
        {name: 'Admin', path: '/admin', icon: <FaUserCog/>},
    ];

    return (
        <div className="container">
            <div style={{width: isOpened ? "220px": "50px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpened ? "block": "none"}} className="logo">Logo</h1>
                    <div style={{marginLeft: isOpened ? "110px": "0"}} className="bars"><FaBars onClick={toggle}/></div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className='link'>
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpened ? "block": "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main style={{marginLeft: isOpened ? "225px": "55px"}}>{children}</main>
        </div>
    );
}

export default Sidebar;
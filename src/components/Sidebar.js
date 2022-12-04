// if connected, add a sidebar menu
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useContext} from 'react';
import {Theme} from '../utils/Theme';
import {logout} from '../utils/utils';
import {Link} from 'react-router-dom';
import '../scss/sidebar.scss';
import {FaHome, FaBars, FaUserAlt, FaEdit, FaUserCog, FaSignOutAlt} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpened, setIsOpened] = useState(false);
    const toggle = () => setIsOpened(!isOpened);
    const menuItem = [
        {name: 'Home', path: '/', icon: <FaHome/>},
        {name: 'PixelBoardCreate', path: '/PixelBoardCreate', icon: <FaEdit/>},
        {name: 'Admin', path: '/Admin', icon: <FaUserCog/>},
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
                        <NavLink to={item.path} key={index} activeClassName="active" className='link'>
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
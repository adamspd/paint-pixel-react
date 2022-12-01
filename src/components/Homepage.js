import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"; 
import {useContext} from 'react';
import {Theme} from '../Theme';



import { logout } from '../utils';

function Homepage(props) {
  let navigate = useNavigate();
  const {theme, ChangeTheme} = useContext(Theme);
  const location = useLocation();
  const handeLogout = () =>{
    logout();
    navigate('/Login');
};
const handeTheme = () =>{
  ChangeTheme();
};

  return (

      <section>
        <div>Welcome {location.state.username}</div>
        <button onClick={handeLogout}>Logout</button>
        <button onClick={handeTheme}>Change Theme</button>
      </section>

  )
}

export default Homepage
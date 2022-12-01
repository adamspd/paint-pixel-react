import React from 'react'
import { useNavigate } from "react-router-dom"; 
import {useContext} from 'react';
import {Theme} from '../utils/Theme';



import { logout } from '../utils/utils';

function Homepage(props) {
  let navigate = useNavigate();
  const {theme, ChangeTheme} = useContext(Theme);
  
  const handeLogout = () =>{
    logout();
    navigate('/Login');
};
const handeTheme = () =>{
  ChangeTheme();
};

  return (

      <section>
        <div>Welcome</div>
        <button onClick={handeLogout}>Logout</button>
        <button onClick={handeTheme}>Change Theme</button>
      </section>

  )
}

export default Homepage
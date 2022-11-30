import React from 'react'
import '../css/template.css'
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils';
import {isAuthenticate} from '../utils'


function Template() {

  let navigate = useNavigate();

const handeLogout = () =>{
     logout();
     navigate('/Login');
};
  return (
    <>
   <nav className='templateNav'>
    <h1>Paint Pixel</h1>
    <button hidden= {!isAuthenticate() ? true : false}onClick={handeLogout}>Logout</button>
   </nav>
   <footer></footer>
   </>
  )
}

export default Template
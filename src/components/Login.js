import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import axios from '../axios'
import { Link } from 'react-router-dom';


const LOGIN_URL = '/login'
function Login() {

  const userNameInput = useRef();
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [msg, setMsg] = useState('hiio');
  const [success, setSuccess] = useState(false)


  useEffect(()=> {
    userNameInput.current.focus()  
  }, []);


  useEffect(()=>{

    setPassword(password);
    setUserName(userName);

  }, [password, userName]);


  
  const handleSubmit = async (e) => {
     e.preventDefault();
      try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({username: userName, password: password }), 
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
        );

        response.then(setSuccess(true));
        

        }

    catch (error) {
    setMsg(error);

       
       
   }
    }



  return (
    <>
    {success? <section>
      <h1>Vous êtes Connecté</h1>
    </section> : 
    <section>
      <h1>Connexion</h1>
      <h1>{msg}</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='usermane'>username :</label>
            <input
            id='usermane'
            type='text'
            ref={userNameInput}
            required={true}
            autoComplete='off'
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
          >

            </input>
          </div>
          <label htmlFor='password'>
            password : 
          </label>
          <input
          id='password'
          type='text'
          required={true}
          autoComplete='off'
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
          >
          </input>
          <div>
            <p>not a member yet?</p>
            <Link to='/signup'>Register here</Link>
          </div>
          <div>
            <button>Login</button>

          </div>

        </form>
      </div>
    </section>}
    </>
  )
}

export default Login
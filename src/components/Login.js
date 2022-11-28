import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import axios from '../axios'
import { Link } from 'react-router-dom';
import '../css/login.css'
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LOGIN_URL = '/login'
function Login() {
  const userNameInput = useRef();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");



  useEffect(() => {
    userNameInput.current.focus();
    // setErrMsg('')
  }, []);


  useEffect(() => {

    setPassword(password);
    setUserName(userName);

  }, [password, userName]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ username: userName, password: password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );


      setSuccess(true);

    }

    catch (error) {
      setErrMsg('No Server Response' + error);
      if (!error?.response) {
        setErrMsg('No Server Response, check that you are connected to the internet' + error);
      }
      else if (error.response?.status === 403) {
        setErrMsg("an error has occurred, Please Retry Again!");
      }
      else if (error.response?.status === 404) {
        setErrMsg("an error has occurred in your login and/or password, Please Retry Again!");
      }
      else {
        setErrMsg('Erreuuuuur');
      }


    }

  }



  return (
    <>
      {success ? <section>

        <h1>Vous êtes Connecté</h1>
      </section> :
        <section className='loginForm'>
          <div className='hearder'>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Connexion</h1>
          </div>
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
                  onChange={(e) => setUserName(e.target.value)}
                >

                </input>
              </div>
              <label htmlFor='password'>
                password :
              </label>
              <input
                id='password'
                type='password'
                required={true}
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
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
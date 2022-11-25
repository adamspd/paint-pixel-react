import React, { useState } from 'react'
import { useRef, useEffect } from 'react'




function Login() {

  const userNameInput = useRef();
  // const {inputFocus, setInputFocus} = useState(false);
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');


  useEffect(()=> {
    userNameInput.current.focus()  
  }, []);


  useEffect(()=>{

    setPassword(password);
    setUserName(userName);

  }, [password, userName]);

  return (
    <section>
      <h1>Connexion</h1>
      <div>
        <form>
          <div>
            <label htmlFor='usermane'>username :</label>
            <input
            id='usermane'
            type='text'
            ref={userNameInput}
            required={true}
            autoComplete='off'
          //  onFocus={() => {setInputFocus(true)}}
           // onBlur={() => {setInputFocus(false)}}
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
          //  onChange={}
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
            <button>Login</button>

          </div>

        </form>
      </div>
    </section>
  )
}

export default Login
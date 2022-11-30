import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../axios'


const CREATE_USER_URL = '/creaseUser'

function Signup() {
  const userNameInput = useRef();

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");



  useEffect(() => {
    userNameInput.current.focus();
    setErrMsg('');
  }, []);


  useEffect(() => {

    setPassword(password);
    setUserName(userName);
    setConfirmPassword(confirmPassword);
    setFirstName(firstName);
    setLastName(lastName);

  }, [password, userName, confirmPassword, firstName, lastName]);

  useEffect(() => {
    password === confirmPassword ? setIsPasswordValid(true) : setIsPasswordValid(false)


  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(CREATE_USER_URL, JSON.stringify({ userName, password, firstName, lastName }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setSuccess(true);
      console.log(response.data);
      // console.log(response.data());


    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Responseeeee' + error);
      }
      else if (error.response?.status === 600) {
        setErrMsg("Username already exist.");
      }
      else {
        setErrMsg('Erreuuuuur');
      }


    }
  }

  return (
    <>
      {success ? <section>

        <h1>Your account has been created Successfully!</h1>
        <Link to='/'>Login Here</Link>
      </section> :

        <section>
          <div className='loginForm'>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
          </div>
          <h1>Register</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='usermane'>username :</label>
                <input
                  id='usermane'
                  type='text'
                  ref={userNameInput}
                  autoComplete='off'
                  //  onFocus={() => {setInputFocus(true)}}
                  // onBlur={() => {setInputFocus(false)}}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                //  onChange={}
                >
                </input>
              </div>

              <div>
                <label htmlFor='firstName'>firstName :</label>
                <input
                  id='firstName'
                  type='text'
                  autoComplete='off'
                  required={true}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}

                >
                </input>
              </div>

              <div>
                <label htmlFor='lastName'>lastName :</label>
                <input
                  id='lastName'
                  type='text'
                  autoComplete='off'

                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                >
                </input>
              </div>

              <div>
                <label htmlFor='password'>
                  password :
                </label>
                <input
                  id='password'
                  type='password'
                  autoComplete='off'
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                >
                </input>
              </div>

              <div>
                <label htmlFor='confirmPassword'>
                  password :
                </label>
                <input
                  id='confirmPassword'
                  type='password'
                  autoComplete='off'
                  required={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                >
                </input>
              </div>

              <div>
                <button disabled={!isPasswordValid ? true : false} className='createUserButton'>Submit</button>

              </div>

            </form>
          </div>
        </section>
      }</>)
}

export default Signup
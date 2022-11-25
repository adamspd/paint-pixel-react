import React from 'react'
import { useRef, useEffect, useState } from 'react'
import axios from '../axios'


const CREATE_USER_URL = '/creaseUser'

function Signup() {
  const userNameInput = useRef();
  // const {inputFocus, setInputFocus} = useState(false);
  const [ userName, setUserName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [ Success, setSuccess] = useState(false)
  const [ ErrMsg, setErrMsg] = useState('')


  useEffect(()=> {
    userNameInput.current.focus()  
  }, []);


  useEffect(()=>{

    setPassword(password);
    setUserName(userName);
    setConfirmPassword(confirmPassword);
    setFirstName(firstName);
    setLastName(lastName);

  }, [password, userName, confirmPassword, firstName, lastName]);

  useEffect(()=> {
    password === confirmPassword ? setIsPasswordValid(true) : setIsPasswordValid(false)


  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(CREATE_USER_URL, JSON.stringify({userName, password, firstName, lastName }), 
          {
              headers: { 'Content-Type': 'application/json'},
              withCredentials: true
          }
      );

      console.log(response.data);
      // ou full answer
   //  console.log(JSON.stringify(response));
    setSuccess(true);
     // clear input fields
 
 } catch (error) {
     if (!error?.response){
         setErrMsg('No Server Response'+ error);
     }
     else if(error.response?.status === 600){
         setErrMsg("Password shouldn't contain parts of the username");
     }
     else{
         setErrMsg('Erreuuuuur');
     }
     
     
 }
  }

  return (
    <section>
      <h1>Register</h1>
      <h1>{firstName}</h1>
      <h1>{lastName}</h1>
      <h1>{password}</h1>
      <h1>{confirmPassword}</h1>
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
            onChange={(e)=> setUserName(e.target.value)}
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
          //  onFocus={() => {setInputFocus(true)}}
           // onBlur={() => {setInputFocus(false)}}
            value={firstName}
            onChange={(e)=> setFirstName(e.target.value)}
          //  onChange={}
          >
            </input>
          </div>

          <div>
            <label htmlFor='lastName'>lastName :</label>
            <input
            id='lastName'
            type='text'
            autoComplete='off'
          //  onFocus={() => {setInputFocus(true)}}
           // onBlur={() => {setInputFocus(false)}}
            value={lastName}
            onChange={(e)=> setLastName(e.target.value)}
          //  onChange={}
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
          onChange={(e)=> setPassword(e.target.value)}
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
          onChange={(e)=> setConfirmPassword(e.target.value)}
          value={confirmPassword}
          >
          </input>
          </div>

          <div>
            <button disabled =  {!isPasswordValid ? true : false} className='createUserButton'>Submit</button>

          </div>

        </form>
      </div>
    </section>
  )
}

export default Signup
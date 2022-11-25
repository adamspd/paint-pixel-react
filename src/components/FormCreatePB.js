import React from 'react'
import { useRef, useState } from 'react'
import axios from '../axios'



const CREATE_PIXELBOARD_URL = '/creasePB'

function FormCreatePB() {

    const titleRef = useRef();
    // const {inputFocus, setInputFocus} = useState(false);
    const [ title, setTile ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ dealine, setDealine ] = useState('');
    const [ statut, setStatut ] = useState(false);
    const [ boardSize, setBoardSize ] = useState('');
  //  const [ author, setAuthor ] = useState('');
    const [ pixelModification, setPixelModification ] = useState('');
    const [timeLimit, setTimeLimit] = useState(false);
  
  
    // useEffect(()=> {
    //     titleRef.current.focus()  
    // }, []);
 
  
    // useEffect(()=>{
  
    //   setPassword(password);
    //   setUserName(userName);
    //   setConfirmPassword(confirmPassword);
    //   setFirstName(firstName);
    //   setLastName(lastName);
  
    // }, [password, userName, confirmPassword, firstName, lastName]);
  
    // useEffect(()=> {
    //   password === confirmPassword ? setIsPasswordValid(true) : setIsPasswordValid(false)
  
  
    // }, [password, confirmPassword]);
  


    // title: String,
    // statut: { type: Boolean, default: false},
    // createdAt: { type: Date, default: Date.now},
    // dealine: { type: Date},
    // boardSize: {type: Number, required: true},
    // author: { type: Schema.Types.ObjectId, ref: 'User'},
    // pixelModification: {type: Boolean, required: true},
    // timeLimit: {type: Number, required: true},




  //   const handleSubmit = async () => {
  //     try {
  //       const response = await axios.post(CREATE_PIXELBOARD_URL, JSON.stringify({title, statut, dealine, boardSize, author, pixelModification, timeLimit }), 
  //           {
  //               headers: { 'Content-Type': 'application/json'},
  //               withCredentials: true
  //           }
  //       );
  
  //       console.log(response.data);
  //       // ou full answer
  //    //  console.log(JSON.stringify(response));
  //     setSuccess(true);
  //      // clear input fields
   
  //  } catch (error) {
  //      if (!error?.response){
  //          setErrMsg('No Server Response'+ error);
  //      }
  //      else if(error.response?.status === 600){
  //          setErrMsg("Password shouldn't contain parts of the username");
  //      }
  //      else{
  //          setErrMsg('Erreuuuuur');
  //      }
       
       
  //  }
  //   }




  return (
    <section>
      <h1>Create Pixel Board</h1>
      <div>
        <form>
          <div>
            <label htmlFor='title'>title :</label>
            <input
            id='title'
            type='text'
            ref={titleRef}
            autoComplete='off'
          //  onFocus={() => {setInputFocus(true)}}
           // onBlur={() => {setInputFocus(false)}}
            value={title}
            onChange={(e)=> setTile(e.target.value)}
          //  onChange={}
          >
            </input>
          </div>

          <div>
            <label htmlFor='statut'>statut :</label>
            <input
            id='statut'
            type='checkbox'
            // required={true}
          //  onFocus={() => {setInputFocus(true)}}
           // onBlur={() => {setInputFocus(false)}}
            value={statut}
            onChange={(e)=> setStatut(e.target.value)}
          //  onChange={}
          >
            </input>
          </div>

          <div>
            <label htmlFor='dealine'>dealine :</label>
            <input
            id='dealine'
            type='date'
            autoComplete='off'
          //  onFocus={() => {setInputFocus(true)}}
           // onBlur={() => {setInputFocus(false)}}
            value={dealine}
            onChange={(e)=> setDealine(e.target.value)}
          //  onChange={}
          >
            </input>
          </div>

          <div>
          <label htmlFor='boardSize'>
          boardSize : 
          </label>
          <input
          id='boardSize'
          type='range'
          min="5"
          max="100"
          step="5"
          required={true}
          onChange={(e)=> setBoardSize(e.target.value)}
          value={boardSize}
          >
          </input>
          <label >
          {boardSize}
          </label>
          </div>

          <div>
          <label htmlFor='pixelModification'>
          pixelModification : 
          </label>
          <input
          id='pixelModification'
          type='checkbox'
          required={true}
          onChange={(e)=> setPixelModification(e.target.value)}
          value={pixelModification}
          >
          </input>
          </div>

          <div>
          <label htmlFor='timeLimit'>
          timeLimit (sec) : 
          </label>
          <input
          id='timeLimit'
          type='number'
          autoComplete='off'
          required={true}
          onChange={(e)=> setTimeLimit(e.target.value)}
          value={timeLimit}
          >
          </input>
          </div>
          <div>
            <button className='createPixelBoardButton'>Submit</button>

          </div>

        </form>
      </div>
    </section>
  )
}

export default FormCreatePB
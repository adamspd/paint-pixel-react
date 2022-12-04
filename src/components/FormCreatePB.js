import React from 'react'
import {useRef, useState, useEffect} from 'react'
import axios from '../utils/axios'
import {Sidebar} from './index';
import '../scss/createPixelBoard.scss'
import { getCurrentUser } from '../utils/utils';
import PixelBoard from './PixelBoard';


const CREATE_PIXELBOARD_URL = '/pixelboard/create'

function FormCreatePB() {

    const titleRef = useRef();
    const [title, setTile] = useState('');
    const [author, setAuthor] = useState("");
    const [dealine, setDealine] = useState(new Date());
    const [isValidDeadline, setIsValidDeadline] = useState(false);
    const [statut, setStatut] = useState(500);
    const [boardSize, setBoardSize] = useState(500);
    const [pixelModification, setPixelModification] = useState(false);
    const [timeLimit, setTimeLimit] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        titleRef.current.focus();
        const username = sessionStorage.getItem('user');
        setAuthor( username);
    }, [author]);


    useEffect(() => {
        setTile(title);
        setStatut(statut);
        setBoardSize(boardSize);
        setPixelModification(pixelModification);
        setTimeLimit(timeLimit);

    }, [title, dealine, isValidDeadline, statut, boardSize, pixelModification, timeLimit]);

    useEffect(() => {
        (new Date(dealine) <= new Date()) ? setIsValidDeadline(true) : setIsValidDeadline(false);
    }, [dealine]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(CREATE_PIXELBOARD_URL, JSON.stringify({
                title, statut, dealine, boardSize, author, pixelModification, timeLimit
            }), {
                headers: {'Content-Type': 'application/json'}, withCredentials: true
            });
            console.log(response.data);
            setSuccess(() => true);


        } catch (error) {
            console.log("ici react error");
            if (!error?.response) {
                console.log('No Server Response' + error);
            } else if (error.response?.status === 600) {
                console.log("Password shouldn't contain parts of the username");
            } else {
                console.log('Erreuuuuur');
            }
        }
    }


    return (
        <Sidebar>
            {!success ? <section className='createPixelBoardForm'>
                <h1>Create Pixel Board</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='title'>Title</label>
                            <input
                                id='title'
                                type='text'
                                ref={titleRef}
                                autoComplete='off'
                                value={title}
                                placeholder={'Put the title of your pixel board'}
                                onChange={(e) => setTile(e.target.value)}
                            >
                            </input>
                        </div>

                        {/* <div>
                            <label htmlFor='status'>Status:
                                <input
                                    id='statut'
                                    type='checkbox'
                                    value={statut}
                                    className='checkbox'
                                    onChange={(e) => setStatut(e.target.value)}
                                >
                                </input></label>
                        </div> */}

                        <div>
                            <label htmlFor='dealine'>Dealine</label>
                            <input
                                id='dealine'
                                type='date'
                                autoComplete='off'
                                value={dealine}
                                onChange={(e) => setDealine(e.target.value)}
                            >
                            </input>
                        </div>

                        <div>
                            <label htmlFor='boardSize'>
                                BoardSize: {boardSize}
                            </label>
                            <select
                                id='boardSize'
                                // type='range'
                                // min="5"
                                // max="100"
                                // step="5"
                                
                                // required={true}
                                onChange={(e) => setBoardSize(e.target.value)}
                                value={boardSize}
                            >
                                <option value='500' label='500 x 500'></option>
                                <option value='1000' label='1000 x 1000'> </option>
                                <option value='200' label='200 x 200' ></option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor='pixelModification'>
                                Pixel Modification:
                                <input
                                    id='pixelModification'
                                    type='checkbox'
                                    // required={true}
                                    className='checkbox'
                                    onChange={(e) => setPixelModification(e.target.value)}
                                    value={pixelModification}
                                >
                                </input>
                            </label>
                        </div>

                        <div>
                            <label htmlFor='timeLimit'>
                                Time Limit (sec) :
                            </label>
                            <input
                                id='timeLimit'
                                type='number'
                                autoComplete='off'
                                required={true}
                                onChange={(e) => setTimeLimit(e.target.value)}
                                value={timeLimit}
                                min="0"
                                max="60"
                            >
                            </input>
                        </div>
                        <div>
                            <button disabled={(!isValidDeadline) ? false : true}
                                    className='createPixelBoardButton'>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section> : <PixelBoard size= {boardSize} author= {author} />}
            
        </Sidebar>
    )
}

export default FormCreatePB
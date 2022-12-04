import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../scss/publicHomepage.scss'
import {FaChevronDown} from 'react-icons/fa'
import {Collapse} from '@material-ui/core'
import useWindowPosition from '../hook/useWindowPosition'
import {Link as Scroll} from 'react-scroll'
import axios from '../utils/axios'

function PublicHomePage() {
    const [checked, setChecked] = React.useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        setChecked(true);
    }, []);
    const check = useWindowPosition('card-container');

    // get number of users registered
    const [users, setUsers] = useState(0);
    const [pixelBoard, setPixelBoard] = useState(0);

    useEffect(() => {
        axios.get('/users/count')
            .then(res => {
                console.log(res.data);
                setUsers(res.data.count);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        axios.get('/pixelboard/count')
            .then(res => {
                console.log(res.data);
                setPixelBoard(res.data.count);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const login = () => {
        console.log("login");
        navigate('/Login');
    }

    const register = () => {
        console.log("register");
        navigate('/SignUp');
    }

    return (
        <div className="publicHomepage" id='publicHomepage'>
            <div className="root">
                <Collapse in={checked} {...(checked ? {timeout: 1000} : {})} collapseHeight={50}>
                    <div className="title">
                        <h1 className='welcome'>
                            Welcome to <br/> Paint&nbsp;
                            <span className="red colorText">P</span>
                            <span className="yellow colorText">i</span>
                            <span className="darkGreen colorText">x</span>
                            <span className="darkBlue colorText">e</span>
                            <span className="pink colorText">l</span>
                        </h1>
                        <h2 className='subTitle'>A pixel art editor</h2>
                        <div className="dropDown">
                            <Scroll to='card-container' smooth={true}>
                                <FaChevronDown className='chevronDown'/>
                            </Scroll>
                        </div>
                    </div>
                </Collapse>
            </div>
            <div className="cardContainer" id='card-container'>
                <Collapse in={check} {...(check ? {timeout: 1000} : {})}>
                    <div className="informationCard">
                        <h1>What is PaintPixel?</h1>
                        <p className='textInfo'>PaintPixel is a pixel art editor made with React and NodeJS. It allows
                            you to create pixel
                            art and share it with your friends. You can also create pixel art boards and invite your
                            friends to participate in the creation of your pixel art.</p>
                        <p>
                            # of user registered&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {users} <br/>
                            # of PixelBoard created&nbsp;: {pixelBoard}
                        </p>
                    </div>
                    <div className="container">
                        <div className="card">
                            <div className="cardContent" check={check}>
                                <h1 className='cardTitle'>Register</h1>
                                <p className='cardText'>Create your own account now </p>
                                <button onClick={register}>Register now</button>
                            </div>
                        </div>

                        <div className="card">
                            <div className="cardContent">
                                <h1 className='cardTitle'>Login and Share</h1>
                                <p className='cardText'>Create your own pixel art share with your friends and enjoy</p>
                                <button onClick={login}>Login</button>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default PublicHomePage
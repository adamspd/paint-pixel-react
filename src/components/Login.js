import React, {useState} from 'react'
import {useRef, useEffect} from 'react'
import axios from '../utils/axios'
import {Link, UNSAFE_DataRouterStateContext} from 'react-router-dom';
import '../css/login.scss'
import {saveJwt, logout, isAuthenticate, getJwt, saveTheme, getTheme, switchTheme} from '../utils/utils';
import {useNavigate} from 'react-router-dom';
import {Theme} from '../utils/Theme';
import {useContext} from 'react';


const LOGIN_URL = '/login'

function Login() {

    const {theme, ChangeTheme, InitTheme} = useContext(Theme);
    let navigate = useNavigate();

    const userNameInput = useRef();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");


    useEffect(() => {
        userNameInput.current.focus();
    }, []);


    useEffect(() => {

        setPassword(password);
        setUserName(userName);

    }, [password, userName]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({username: userName, password: password}), {
                headers: {'Content-Type': 'application/json'}, withCredentials: true
            });

            logout();
            saveJwt(response.data.token);
            saveTheme(response.data.user.theme);
            console.log(getTheme());

            console.log('ici le theme reçu : ' + response.data.user.theme);
            console.log('ici le theme initialisé : ' + getTheme());
            InitTheme(response.data.user.theme);
            navigate('/');

        } catch (error) {
            setErrMsg('No Server Response' + error);
            if (!error?.response) {
                setErrMsg('No Server Response, check that you are connected to the internet' + error);
            } else if (error.response?.status === 403) {
                setErrMsg("an error has occurred, Please Retry Again!");
            } else if (error.response?.status === 404) {
                setErrMsg("an error has occurred in your login and/or password, Please Retry Again!");
            } else {
                setErrMsg('Erreuuuuur');
            }
        }
    }


    return (<>
        {success ?
            <section>
            <h4>Vous êtes Connecté</h4>
        </section> : <section className='loginForm'>
            <div className='headerTitle'>
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <h1>Connexion</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='usermane'>Username:&nbsp;</label>
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
                        Password:&nbsp;
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
                        <p>
                            Not a member yet ?&nbsp;
                            <Link to='/signup'>Register here</Link>
                        </p>
                    </div>
                    <div>
                        <button className='loginButton'>Login</button>
                    </div>
                </form>
            </div>
        </section>}
    </>)
}

export default Login
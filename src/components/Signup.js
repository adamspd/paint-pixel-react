import React from 'react'
import {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import axios from '../utils/axios'
import '../scss/signup.scss'


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

    /**
     * Setting the page's title
     */
    useEffect(() => {
        document.title = 'Registration';
    }, []);


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
            const response = await axios.post(CREATE_USER_URL, JSON.stringify({
                userName, password, firstName, lastName
            }), {
                headers: {'Content-Type': 'application/json'}, withCredentials: true
            });
            setSuccess(true);
            console.log(response.data);

        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Responseeeee' + error);
            } else if (error.response?.status === 600) {
                setErrMsg("Username already exist.");
            } else {
                setErrMsg('Erreuuuuur');
            }
        }
    }

    return (<>
        {success ? <section className='successMessage'>
                <h4>
                    Your account has been created successfully!&nbsp;
                </h4>
                <div className='linkLogin'>
                    <Link to='/Login'>Login Here</Link>
                </div>
            </section> :

            <section className='registerForm'>
                <div>
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                </div>
                <h1 className='title'>Register</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='usermane'>Username:&nbsp;</label>
                            <input
                                id='usermane'
                                type='text'
                                ref={userNameInput}
                                autoComplete='off'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            >
                            </input>
                        </div>

                        <div>
                            <label htmlFor='firstName'>FirstName:&nbsp;</label>
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
                            <label htmlFor='lastName'>LastName:&nbsp;</label>
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
                                Password:&nbsp;
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
                                Confirm Password:&nbsp;
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
                            <p>
                                Already have an account ?&nbsp;
                                <Link to='/login'>Login here</Link>
                            </p>
                        </div>

                        <div>
                            <button disabled={!isPasswordValid ? true : false} className='submitButton'>Submit
                            </button>

                        </div>

                    </form>
                </div>
            </section>}</>)
}

export default Signup
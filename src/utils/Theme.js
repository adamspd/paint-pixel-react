import React, {createContext, useEffect} from 'react'
import {useState} from 'react'
import axios from './axios'
import {getJwt, getTheme, switchTheme} from './utils'


const URL_UPDATE_THEME = '/theme/update'

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState('');
    const JWT = getJwt();

    useEffect(() => {
        setTheme((prevState) => (getTheme()));
    }, [theme]);

    const ChangeTheme = async () => {
        console.log('theme: ' + theme);
        const themeSwitched = await switchTheme(theme);
        console.log('themeSwitched: ' + themeSwitched);
        const response = await axios.post(URL_UPDATE_THEME, JSON.stringify({theme: themeSwitched}), {
                headers: {
                    'authorization': JWT,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );

        console.log("reponse change theme :" + response.data.reponse);
        setTheme(() => (themeSwitched));
        console.log('theme: ' + theme);
    }

    const InitTheme = async (themeInit) => {
        const reversedTheme = themeInit === 'light' ? 'dark' : 'light';
        const themeSwitched = await switchTheme(reversedTheme);
        setTheme(() => (themeSwitched));
    }


    return (
        <Theme.Provider value={{theme, ChangeTheme, InitTheme}}>
            {props.children}
        </Theme.Provider>
    )
}

export const Theme = createContext();
export default ThemeProvider;
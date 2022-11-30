import React, { createContext } from 'react'
import { useContext, useState } from 'react'

const ThemeProvider = (props) =>  {
    const [theme, setTheme] = useState(false);


  return (
    <Theme.Provider> value={{theme}}
        {props.children}
    </Theme.Provider>
  )
}

export const Theme = createContext();
export default ThemeProvider;
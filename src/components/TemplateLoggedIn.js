import React from 'react'
import '../css/template.css'
import {useContext} from 'react';
import {Theme} from '../utils/Theme';
import {Sidebar} from './index';


function Template() {
    const {theme} = useContext(Theme);
    return (
        <div>
            <Sidebar />
        </div>
    )
}

export default Template
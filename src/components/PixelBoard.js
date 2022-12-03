import {warning} from '@remix-run/router';
import React, {useEffect, useState, useRef} from 'react'
import '../css/pixelboard.css'

function PixelBoard() {
    const canvasRef = useRef(null);
    const [color, setColor] = useState(null);
    const [warning, setWarning] = useState(null);
    // const [x, setX] = useState(null); 
    // const [y, setY] = useState(null); 
    // const [height, setHeight] = useState(null); 
    // const [width, setWidth] = useState(null);

    // useEffect(()=> {

    // }, [x,y])

    useEffect(() => {

        canvasRef.current.width = 500;
        canvasRef.current.height = 500;
        setWarning(null);


        // paintPixel(100, 100, '#333');

    }, []);

    useEffect(() => {
        setWarning(null);

    }, [color]);

    const paintPixel = (x, y, color) => {
        const context = canvasRef.current.getContext("2d");
        context.fillStyle = color;
        context.fillRect(x, y, 50, 50);

    };
    // const getMousePos = ()=> {
    //     const position = canvasRef.current.MouseGetPos();
    //     const mousePositionX = position[0];
    //     const mousePositionY = position[1];
    //     const rect = canvasRef.current.getBoundingClientRect();

    // };
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left, y: evt.clientY - rect.top
        };
    }

    const draw = (e) => {
        const {x, y} = getMousePos(canvasRef.current, e);
        console.log(getMousePos(canvasRef.current, e));
        console.log(x);
        console.log(y);
        if (!color) return setWarning("You need to color to fill with! (By clicking on it)");
        paintPixel(x, y, color);

    };

    const show = (e) => {
        const {x, y} = getMousePos(canvasRef.current, e)
        console.log(getMousePos(canvasRef.current, e))
        const context = canvasRef.current.getContext("2d");
        context.fillStyle = "gray";
        context.fillRect(x, y, 50, 50);

    };
    const selectColor = (e) => {

        setColor(e.target.className.split(' ')[1]);
        console.log(e.target.className.split(' ')[1]);

    }


    return (<>
            <h1 hidden={!warning ? true : false}>{warning}</h1>
            <section className="pixelBoardContainer">


                <canvas className='container-pb'
                        ref={canvasRef}
                        onClick={draw}
                    // onMouseOver ={show}
                >


                </canvas>
                <div className='colorChoices'>

                    <div className='colorChoice red' onClick={selectColor}>

                    </div>
                    <div className='colorChoice green' onClick={selectColor}>

                    </div>
                    <div className='colorChoice gray' onClick={selectColor}>

                    </div>
                    <div className='colorChoice blue' onClick={selectColor}>

                    </div>
                    <div className='colorChoice pink' onClick={selectColor}>

                    </div>
                    <div className='colorChoice yellow' onClick={selectColor}>

                    </div>
                    <div className='colorChoice aqua' onClick={selectColor}>

                    </div>

                </div>
            </section>
        </>

    )
}

export default PixelBoard
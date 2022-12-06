import React, {useEffect, useState, useRef} from 'react'
import '../scss/pixelboard.scss'
import axios from "../utils/axios";

/***
 * @param props
 * @returns {JSX.Element}
 * @constructor
 * @description PixelBoard component. It is used to display a pixelboard. It needs at least a size, a title,
 * an author, a pixelboard id and a pixelboard array as props.
 */
function PixelBoard(props) {

    const WIDTH = props.size;
    const HEIGHT = props.size;

    const PIXEL_WIDTH = WIDTH / 20;
    const PIXEL_HEIGHT = HEIGHT / 20;

    const colorTab = ['red', 'blue', 'green', 'gray', 'yellow', 'pink', 'aqua'];

    const canvasRef = useRef(null);

    const [color, setColor] = useState(null);
    const [isColorSet, setIsColorSet] = useState(null);
    const [warning, setWarning] = useState(null);

    const [hoverColor, setHoverColor] = useState('aqua');
    const [pos, setPos] = useState(null);

    const [pixels, setPixels] = useState(new Map());

    const syntax = (x, y) => {
        return `pixel_${x}_${y}`
    }

    useEffect(() => {
        canvasRef.current.width = WIDTH;
        canvasRef.current.height = HEIGHT;
        const context = canvasRef.current.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, WIDTH, HEIGHT);
        setWarning(null);
    }, []);

    /***
     * Set warning message to null initially.
     * The warning message is displayed when the user tries to click on a pixel without selecting a color
     */
    useEffect(() => {
        setWarning(null);
    }, []);

    /***
     * Paint initial pixels if there is any
     */
    useEffect(() => {
        const pixelsArray = Array.from(props.pixels);
        // use paintPixel function to paint each pixel
        pixelsArray.forEach((pixel) => {
            paintPixel(pixel.x, pixel.y, pixel.color);
            setPixels((p) => p.set(syntax(pixel.x, pixel.y), pixel.color));
        });
    }, [props.pixels]);

    /***
     * @param x
     * @param y
     * @param color
     * Send pixel to the server for saving when the user click on the canvas
     */
    const sendPixel = (x, y, color) => {
        axios.patch(`/pixelboard/save-pixel/${props.p_id}/${x}/${y}/${color}`).then(
            (response) => {
                console.log(response.data);
            }).catch((err) => {
            console.log(err);
        })
    };

    /***
     * @param x
     * @param y
     * @param color
     * Paint a pixel on the canvas
     */
    const paintPixel = (x, y, color) => {
        const pixelX = x * PIXEL_WIDTH;
        const pixelY = y * PIXEL_HEIGHT;

        const context = canvasRef.current.getContext("2d");
        context.fillStyle = color;
        context.fillRect(pixelX, pixelY, PIXEL_WIDTH, PIXEL_HEIGHT);
    };

    /***
     * @param canvas
     * @param evt
     * @returns {{pixelX: number, pixelY: number}}
     * Get the position of the mouse on the canvas
     */
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left
        const y = evt.clientY - rect.top
        const pixelX = Math.floor(x / PIXEL_WIDTH)
        const pixelY = Math.floor(y / PIXEL_HEIGHT)
        return {pixelX, pixelY}
    }

    /***
     * @param e
     * Draw a pixel on the canvas when the user click on it and send the pixel to the server.
     * If the user didn't select a color, a warning message is displayed.
     */
    const draw = (e) => {
        const {pixelX, pixelY} = getMousePos(canvasRef.current, e);
        if (!color) return setWarning("You need to color to fill with! (By clicking on it)");
        paintPixel(pixelX, pixelY, color);
        setPixels((prevPixels) => prevPixels.set(syntax(pixelX, pixelY), {color: color}));
        sendPixel(pixelX, pixelY, color);
    };

    /***
     * @param e
     * Show the color of each pixel if it is in the pixels map, if not, hide it.
     * Remove the warning message if set.
     * Set the hover color to the last selected color.
     */
    const show = (e) => {
        if (color) {
            setHoverColor(color);
            setWarning(false);
        }
        const {pixelX: currentX, pixelY: currentY} = getMousePos(canvasRef.current, e);
        if (pos && !pixels.has(syntax(pos.x, pos.y)) && (isColorSet == null || !isColorSet)) hide2(pos.x, pos.y);

        if (!pixels.has(syntax(currentX, currentY))) {
            setPos(() => ({x: currentX, y: currentY}))
            paintPixel(currentX, currentY, hoverColor);
        }
    }

    /***
     * @param x
     * @param y
     * Hide a pixel by painting it with white
     */
    const hide2 = (x, y) => {
        paintPixel(x, y, 'white');
    }

    const hide = () => {
        hide2(pos.x, pos.y);
    }

    /***
     * @param e
     * Select the color of a pixel by splitting the object e and getting the 2nd element of the array
     */
    const selectColor = (e) => {
        setColor(e.target.className.split(' ')[1]);
    }


    return (
        <>
            <h1>Author: {props.author}</h1>
            <p>Title: {props.title}</p>
            <p hidden={!warning} className='warning'>{warning}</p>
            <section className="container">

                <canvas className='container-pb'
                        ref={canvasRef}
                        onClick={draw}
                        onMouseMove={show}
                        onMouseLeave={hide}
                >


                </canvas>
                <div className='colorChoices'>
                    {colorTab.map((color, index) => (
                        <div key={index} className={'colorChoice ' + color} onClick={selectColor}></div>))}

                </div>
            </section>
        </>

    )
}

export default PixelBoard
 
 
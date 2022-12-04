
 import React, { useEffect, useState, useRef } from 'react'
 import '../scss/pixelboard.scss'
 
 function PixelBoard() {
 
   const WIDTH = 500;
   const HEIGHT = 500;
 
   const PIXEL_WIDTH = WIDTH / 100;
   const PIXEL_HEIGHT = HEIGHT / 100;
   const colorTab = ['red', 'blue', 'green', 'gray', 'yellow', 'pink', 'aqua'];
   const canvasRef = useRef(null);
 
   const [color, setColor] = useState(null); 
   const [ warning, setWarning] = useState(null);
 
   const [hoverColor, setHoverColor] = useState('aqua');
   const [pos, setPos] = useState(null);
 
   const [pixels, setPixels] = useState(new Map());
 
     useEffect(() => {
 
          canvasRef.current.width = WIDTH;
          canvasRef.current.height = HEIGHT;
          const context = canvasRef.current.getContext("2d");
          context.fillStyle = "white";
          context.fillRect(0,0, WIDTH, HEIGHT);
          setWarning(null);
          
 
     },[]);
 
     useEffect(() => {
       setWarning(null);
 
  },[]);
 
     const paintPixel = (x, y, color) => {
         const pixelX = x * PIXEL_WIDTH;
         const pixelY = y * PIXEL_HEIGHT;
 
         const context = canvasRef.current.getContext("2d");
         context.fillStyle = color;
         context.fillRect(pixelX,pixelY, PIXEL_WIDTH, PIXEL_HEIGHT);
 
     };
 
     function getMousePos(canvas, evt) {
       var rect = canvas.getBoundingClientRect();
       const x = evt.clientX - rect.left
       const y = evt.clientY - rect.top
       const pixelX = Math.floor(x / PIXEL_WIDTH)
       const pixelY = Math.floor(y / PIXEL_HEIGHT)
       console.log(pixelX,pixelY);
       return { pixelX, pixelY}
 
     }
 
     const draw = (e) => {
         const {pixelX, pixelY} = getMousePos(canvasRef.current, e);
         console.log(getMousePos(canvasRef.current, e));
         if(!color) return setWarning("You need to color to fill with! (By clicking on it)");
 
         paintPixel(pixelX, pixelY, color);
         // pixels.set(`pixel_${pixelX}_${pixelY}`, {color : color});
         setPixels((prevPixels) => prevPixels.set(`pixel_${pixelX}_${pixelY}`, {color : color}));
         console.log("draw pixels added (xycolor) : " + pixelX, pixelY, color);
         console.log("draw has : " + pixels.has(`pixel_${pixelX}_${pixelY}`));
         console.log("draw has : " + pixels.get(`pixel_${pixelX}_${pixelY}`).color);
         console.log("draw keys : " + pixels);
         pixels.forEach((value, key, innerMap) => {
 
         })
 
     };
     const show = (e) => {
 
       const {pixelX: currentX, pixelY: currentY} = getMousePos(canvasRef.current, e); 
        console.log('les clés ' + pixels.keys().next().value);
       if (pos && !pixels.has(`pixel_${pos.x}_${pos.y}`)) hide2(pos.x, pos.y);
 
        if(pixels.has(`pixel_${currentX}_${currentY}`)){
        // if(pixels.has(`pixel_9_0`)){
         console.log("current pixel"+currentX+' '+currentY+ " issssss save");
         return;
 
         
       }else if (!pixels.has(`pixel_${currentX}_${currentY}`)){
 
         setPos(()=> ({x: currentX, y : currentY}))
         paintPixel(currentX, currentY, hoverColor);
 
       } 
       
     }
 
 
     const hide2 = (x , y) => {
       paintPixel(x, y, 'white');
     }
 
     const hide = (e) => {
       hide2(pos.x, pos.y);
 
     }
 
     const selectColor = (e) =>{
        
       setColor(e.target.className.split(' ')[1]);
       console.log(e.target.className.split(' ')[1]);
 
     }
 
     
 
      
   return (
     <>
     <h1 hidden={!warning ? true : false}>{warning}</h1>
     <section className="container">
 
     <canvas className='container-pb'
      ref={canvasRef} 
      onClick={draw}
      onMouseMove = {show}
      onMouseLeave = {hide}
      >
       
 
     </canvas>
     <div className='colorChoices'>
        {colorTab.map((color, index) => (<div key={index} className={'colorChoice '+ color} onClick={selectColor}></div>))}
 
     </div>
     </section>
     </>
 
   )
 }
 
 export default PixelBoard
 
 
import React, {useState, useEffect, useRef} from 'react';


function Timer(props){
  const [time, setTime] = useState(props.time || 0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false)

  if (time > 0) {
    setHours(Math.floor(time / 3600));
    setMinutes(Math.floor((time % 3600) / 60));
    setSeconds((time % 3600) % 60);

  }
  //  useEffect(() => {
     
     
  //     let timer;
  //     if (start && time > 0){
  //       timer = setInterval(() => {setTime(time => time - 1);}, 1000);
  //     }else{
  //       clearInterval(timer);
  //     }
    
      
  //     return () => {
  //        clearInterval(timer)
  //     }
      
  // },[start, time])
 
    
  
  return(<>
      {!start ? (<div><input type="text" value={hours } onChange={e => {setHours(e.target.value)}} />:
      <input type="text" value={minutes} onChange={e => {setMinutes(e.target.value)}} />:
      <input type="text" value={seconds} onChange={e => {setSeconds(e.target.value)}} /></div>) 
      : ''}
     
      <button onClick={() => {setTime((hours * 3600) + (minutes * 60) + +seconds); setStart(!start)}}> {start ? "Stop": "Start"}</button>
      <button onClick={() => {setTime(0); setStart(false)}}>Reset</button>
      

      </>
  )
}


// function Timer(){
//   const [time, setTime] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [start, setStart] = useState(false)

//    useEffect(() => {
     
     
//       let timer;
//       if (start && time > 0){
//         timer = setInterval(() => {setTime(time => time - 1);}, 1000);
//       }else{
//         clearInterval(timer);
//       }
//       setHours(Math.floor(time / 3600));
//       setMinutes(Math.floor((time % 3600) / 60));
//       setSeconds((time % 3600) % 60);
      
//       return () => {
//          clearInterval(timer)
//       }
      
//   },[start, time])
 
    
  
//   return(<>
//       {!start ? (<div><input type="text" value={hours} onChange={e => {setHours(e.target.value)}} />:
//       <input type="text" value={minutes} onChange={e => {setMinutes(e.target.value)}} />:
//       <input type="text" value={seconds} onChange={e => {setSeconds(e.target.value)}} /></div>) 
//       :<div>Timer: {(Math.floor(time / 3600))}:{Math.floor((time % 3600) / 60)}:{((time % 3600) % 60)}</div>}
     
//       <button onClick={() => {setTime((hours * 3600) + (minutes * 60) + +seconds); setStart(!start)}}> {start ? "Stop": "Start"}</button>
//       <button onClick={() => {setTime(0); setStart(false)}}>Reset</button>
      

//       </>
//   )
// }






export default Timer
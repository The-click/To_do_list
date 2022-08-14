import { useState } from "react";

function EditTimer(props){
	
	
	const [time] = useState(Math.floor((props.timer - new Date()) / 1000) > 0 ? props.timer : 0);
	const [hour,   setHours] =    useState(time > 0 ?  Math.floor(((props.timer - new Date()) / 1000) / 3600) :0);
	const [minutes, setMinutes] = useState(time > 0 ? Math.floor((((props.timer - new Date()) / 1000) % 3600) / 60):0);
	const [second, setSeconds] =  useState(time > 0 ? Math.floor((((props.timer - new Date()) / 1000) % 3600) % 60):0); 

	function saveChangeTimer(){
		let allTime = ((hour * 3600 + minutes * 60 + +second) * 1000 + (+new Date()))
		props.changeTimer(props.id, allTime);
		props.setEditTimer(false);
	}
	function finishTimer(e){
		if (e.target.id === 'cover__timer') props.setEditTimer(false);
		
	}
	function validateTime(time, max = 60){
		return  (time >= 0 && time < max);
	}
	function changeTime(){
		
		return (<div id='changeTime' className="setting__time__wrapper">
			        <div className='setting__time '> 
                       <span></span>
                       <input type="number" 
                              className='change-time' 
                              value={hour}    
                              onChange={(e) => {if(validateTime(e.target.value, 100)) setHours(e.target.value);} }/>
                    </div>
			        <div className='setting__time '> 
                        <span>:</span>
                        <input type="number" 
                               className='change-time'  
                               value={minutes} 
                               onChange={(e) => {if(validateTime(e.target.value)) setMinutes(e.target.value);}}/> 
                    </div>
			        <div className='setting__time'> 
                        <span>:</span>
                        <input type="number" 
                               className='change-time'  
                               value={second} 
                               onChange={(e) => {if(validateTime(e.target.value)) setSeconds(e.target.value);}}/>
                    </div>
				</div>)

	}
	return(<div className='change__time__cover' id='cover__timer' onClick={finishTimer}>
            <div className='block__change__time change__time' 
                 style={{left:`${props.coor.left}px`, top:`${props.coor.top}px`}}> 
                 
		        {changeTime()} <button onClick={saveChangeTimer}>Сохранить изменение</button>
	        </div>
           </div>

	)


}

export default EditTimer;
import plusImg from '../img/add.svg'
import timerImg from '../img/timer.svg'
import { useState } from "react";

function InputAddNote(props){

	const [value, setValue] = useState('');
	// date for timer
	const [startTimer, setStartTimer] = useState(false)
	const [hours,   setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0); 
	// 

	function addNewNote(){
		let timer = (+hours * 3600 + (+minutes * 60) + +seconds) * 1000;
	
		if (value.trim() === '') return;
		props.addNote({text:value.trim(), data: new Date(), timer: timer + +new Date()});
		finishEdit()
	
		
	}
	function changeValue(e){
		setValue(e.target.value);
		if (e.target.value.trim() === '') finishEdit()	
	}
	function finishEdit(){
		setValue('');
		setHours(0);
		setMinutes(0);
		setSeconds(0);	
		setStartTimer(false);

	}
	function validateTime(time, max = 60){
		return  (time >= 0 && time < max);
	}
		
	return(<div className="addNote___wrapper">
		<textarea className='inputAddNote' value={value} onChange={e =>changeValue(e) } />
		<button className="addNote__button" onClick={addNewNote}>Добавить дело <img src={plusImg} alt="plus" className="" /></button>
	{value.trim().length > 0 && !startTimer && <button onClick={e => setStartTimer(true)} className='addNote__button addTimer__button'>Добавить таймер <img src={timerImg} alt="timer" /></button>
	}
	{startTimer ? ( <div className='add__timer'>
					<div className="timer__time setting__time"> 
					<span>часы:</span><input type="number" value={hours} onChange={e => { if (validateTime(e.target.value, 100)) setHours(e.target.value)}} />
					</div> <div className="timer__time">
						<span>минуты:</span><input type="number" value={minutes} onChange={e => {if (validateTime(e.target.value)) setMinutes(e.target.value)}} />
					</div> <div className="timer__time">
						<span>секунды:</span><input type="number" value={seconds} onChange={e => {if (validateTime(e.target.value)) setSeconds(e.target.value)}} />
					</div>
	</div>)  : <></>}
	</div>
	)
}

export default InputAddNote
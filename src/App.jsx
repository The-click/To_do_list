
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import id from 'react-uuid'
import pencilImg from './img/003-edit.svg' 
import trash from './img/007-trash-1.svg'
import clockTimer from './img/alarm-clock.svg'
import plusImg from './img/add.svg'
import timerImg from './img/timer.svg'
import Erunda from './Timer'
import squareImg from './img/square.svg';
import markImg from './img/mark.svg';
import mainIbg from './img/main__ibg.jpg'
// import uuid from 'react-uuid'
// import User from './User'
function App() {

	const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [] );
	useEffect(() => { localStorage.setItem('notes', JSON.stringify(notes))}, [notes]);

	function changeFinishNote(id){
		setNotes(notes.map((item) =>{
			if (item.id == id){
				return {...item, finish:!item.finish}
			}
			else{
				return item
			}
		}))
	}
	function addNote({text, data, timer}){
		if (+data !== timer){
			setNotes(([...notes, {text, data, timer, allTime:(Math.floor((timer - new Date()) / 1000)), finish:false, id: id()}]));
		}else{
			setNotes(([...notes, {text, data, finish:false, id: id()}]));

		}
	}
	function changeNote(value, id){	
	
		setNotes(notes.map((item) => {
			if (item.id === id) {

				return {...item, text:value.trim()}
			}
			else{
				return item
			}
		}))
	}
	function changeTimer(id, timer){
		
      setNotes(notes.map((item) => {
			if (item.id === id) {
				return {...item, timer, allTime:(Math.floor((timer - new Date()) / 1000))}
			}
			else{
				return item
			}
		}))

	}
	function deleteNote(id){
			setNotes(notes.filter(note => note.id !== id))
	}
	const noteWithoutTimer = [];
	const noteWithTimer = [];
	

	
	notes.forEach((item, index) => {
		if (item.timer) {
			noteWithTimer.push(<Note key={item.id} 
									item = {item} 
									changeNote={changeNote} 
									deleteNote={deleteNote} 
									changeTimer={changeTimer}
									changeFinishNote={changeFinishNote}
									/>)
		}else{
		return(  noteWithoutTimer.push(<Note key={item.id} 
											item = {item} 
											changeNote={changeNote} 
											deleteNote={deleteNote}
											changeFinishNote={changeFinishNote}/>))}
	})
	


	return(<div className="wrapper">
		
		<InputAddNote addNote={addNote} />
		<div className="notes__list__wrapper">
		<ul className='notesList notes__with__timer'> 
		<h3>Срочные дела</h3>{
			// Sorting by time
		noteWithTimer.sort((itemA, itemB) =>+itemA.props.item.timer - +itemB.props.item.timer)
		}

		</ul>
		<ul className='notesList notes__without__timer'> 
		<h3>Не срочные дела</h3>
			{noteWithoutTimer}
	
		</ul>
		</div>
		<audio id="player" src="src/music.mp3"></audio>
		
	
	


	</div>)
}

// Add note 
function InputAddNote(props){

	const [value, setValue] = useState('');
	// date for timer
	const [startTimer, setStartTimer] = useState(false)
	const [hours,   setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0); 
	let timeResult;
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
function Note(props){
	let {text, data, timer, allTime, finish, id,} = props.item;
	const myRef = useRef(null);
	
	const timePositionRef = useRef(null);

	const [coordinate, setCoordinate]= useState(null);
	const [editText, setEditText] = useState(false);
	const [editTimer, setEditTimer] = useState(false);
	const [value, setValue] = useState(text);	
	// let hiddenChangeTimer = timer ? {}:{background:'none'};

	function finishedNote(e){
		props.changeFinishNote(id);
	}
			
	function changeNote(e){
		setValue(e.target.value)
		// style textArea for height
		e.target.style.height = e.target.scrollHeight + 'px';
	}


	function startEditText(e){		
		setEditText(true);
	}


	function startEditTimer(e){
		setCoordinate(e.target.closest('li').getBoundingClientRect());
		setEditTimer(true);
	}
	
	function saveChangeNote(e, id){
	
		if (e.relatedTarget?.id === 'saveButton' && !(value.trim() === '')){
			props.changeNote(value, id);
			setValue(value.trim())
		}else{
			setValue(text.trim())
		}
		setEditText(false);
	}
	// Select textarea form for focus
	useEffect(() => { if (!editText) return; myRef.current.select(); }, [editText])
	// 
	let result;
	if (editText){	
		result = <div className="cover__change__note">
			<div className="change__note__wrapper" id="noteWrapper" onBlur={e => saveChangeNote(e, id)} 
			>
			<textarea className="changeInput" value={value} ref={myRef} onChange={changeNote} /> 
			<button className="save__button" id="saveButton">Сохранить</button></div></div>
	}
	else {	
		if(editTimer){
			result = <EditTimer timer={timer} id={id} changeTimer={props.changeTimer} editTimer={editTimer} setEditTimer={setEditTimer} coor={coordinate}/>
		}else{
		result = <>
		{timer && <button id='changeClock' className='button__clock button__hover'  onClick={startEditTimer} >
			<img src={clockTimer} alt="clock" />
		</button>}
		<span className="note__text"> {text} </span> 
		<button id="changeNote" className="button__change button__hover" onClick={startEditText}>
		<img src={pencilImg} alt='Change not' />
		</button> <button id="deleteNote" className="button__delete button__hover"onClick={e => props.deleteNote(id)}> 
		<img src={trash} alt="Delete note" />
		</button>
		<button className='square button__hover' onClick={finishedNote}><img src={squareImg} alt="" className="square__img"/><img className="mark" src={markImg} alt="" />
		<span className='mark__cover'></span>
		</button>
	
		</>}
	}

	return(<li className={`note__li ${finish && 'finished'}` } >
	<div className={`note__wrapper ${timer ? '':'without__timer' }${(editTimer || editText) ? 'none':'' } `} ref={timePositionRef} >
	{result}
	{timer && !editTimer && <span className="note__time showTime"><Timer timer={finish ? +new Date() : timer} allTime={allTime} editText={editText} timePositionRef={timePositionRef}/></span>}</div></li>)
}
function Timer(props){
	const [time, setTime] = useState(Math.floor((props.timer - new Date()) / 1000));
	const allTime = props.allTime;

	
	useEffect(() => {
		
		let clock;
		// change time line 
		props.timePositionRef.current.style.backgroundSize = `${(100 - (time / allTime) * 100 ).toFixed(3)}% 3px`;


		if (time <= 0){
			setTime(0);
			clearTimeout(clock);
		}else{
			// conversion for correct time calculation
			clock = setTimeout(() => {setTime(time => Math.floor((props.timer - new Date()) / 1000));  setTimeout(clock, 1000)}, 1000);
		}
	
		return () => {
			clearTimeout(clock)
		 } }, [time, props.timer]);


	function showTime(time){
		const hour = Math.floor(time > 0  ? (time / 3600) : 0);
		const minutes = Math.floor(time > 0 ? ((time % 3600) / 60) : 0);
		const second = (time > 0 ? ((time % 3600) % 60) : 0);
		function padTime(value){
			return String(value).length === 1 ? `0${value}` : `${value}`;
		}
		return `${padTime(hour)}:${padTime(minutes)}:${padTime(second)}`
	
		}

	return showTime(time)
}

function EditTimer(props){
	
	
	const [time, setTime] = useState(Math.floor((props.timer - new Date()) / 1000) > 0 ? props.timer : 0);
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
		
		return <div id='changeTime' className="setting__time__wrapper">
			<div className='setting__time '> <span></span><input type="number" className='change-time' value={hour} onChange={(e) => {
			if(validateTime(e.target.value, 100)) setHours(e.target.value); 
		} }/></div>
			<div className='setting__time '> <span>:</span><input type="number" className='change-time'  value={minutes} onChange={(e) => {
					if(validateTime(e.target.value)) setMinutes(e.target.value); 
		}

				}/> </div>
			<div className='setting__time'> <span>:</span><input type="number" className='change-time'  value={second} onChange={(e) => {
					if(validateTime(e.target.value)) setSeconds(e.target.value); 
		} }/></div>
				</div>

		

	}
	return(<div className='change__time__cover' id='cover__timer' onClick={finishTimer}><div className='block__change__time change__time' style={{left:`${props.coor.left}px`, top:`${props.coor.top}px`}}> 
		{changeTime()} <button onClick={saveChangeTimer}>Сохранить изменение</button>
	</div></div>

	)


}




export default App;




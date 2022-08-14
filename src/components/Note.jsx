import { useEffect, useRef, useState } from "react";

import pencilImg from '../img/003-edit.svg' 
import trash from '../img/007-trash-1.svg'
import clockTimer from '../img/alarm-clock.svg'

import squareImg from '../img/square.svg';
import markImg from '../img/mark.svg';
import EditTimer from './EditTimer';
import Timer from './Timer';

function Note(props){
	let {text, timer, allTime, finish, id,} = props.item;
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
	
		if ((e.relatedTarget?.id === 'saveButton') && !(value.trim() === '')){
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
		result = (<div className="cover__change__note">
			<div className="change__note__wrapper" id="noteWrapper" onBlur={e => saveChangeNote(e, id)} 
			>
			<textarea className="changeInput" value={value} ref={myRef} onChange={changeNote} /> 
			<button className="save__button" id="saveButton">Сохранить</button></div></div>)
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
		<button className='square button__hover' 
                onClick={finishedNote}>
                    <img src={squareImg} alt="" className="square__img"/>
                    <img className="mark" src={markImg} alt="" />
		<span className='mark__cover'></span>
		</button>
	
		</>}
	}

	return(<li className={`note__li ${finish && 'finished'}` } >
	<div className={`note__wrapper ${timer ? '':'without__timer' }${(editTimer || editText) ? 'none':'' } `} ref={timePositionRef} >
	{result}
	{timer && !editTimer && <span className="note__time showTime"><Timer timer={finish ? +new Date() : timer} allTime={allTime} editText={editText} timePositionRef={timePositionRef}/></span>}</div></li>)
}

export default Note;
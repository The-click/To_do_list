
import './App.css';
import React, {useState, useEffect} from 'react';
import id from 'react-uuid'

import InputAddNote from './components/InputAddNote';
import Note from './components/Note';
function App() {

	const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [] );
	useEffect(() => { localStorage.setItem('notes', JSON.stringify(notes))}, [notes]);

	function changeFinishNote(id){
		setNotes(notes.map((item) =>{
			if (item.id === id){
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
	</div>)
}

// Add note 








export default App;




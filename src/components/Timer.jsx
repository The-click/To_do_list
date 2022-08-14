import { useEffect, useState } from "react";

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

export default Timer
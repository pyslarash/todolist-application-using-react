import React, {useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//create your first component


const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDos, setToDos] = useState([]);
	// We need to add an array to the useRef hook in order to make sure the trash icon appears at the right place
	const showTrash = useRef([]);
	// Creating a function that will return a message that no tasks were entered.
	function NoTasks () {
		return(<div className="notasks">No Tasks Yet. Please, add a task. 👆</div>)
	}
	
	return (
		<div className="container">
			<h1>My To-Do List</h1>
			<ul>
				<li><input 
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						// Input validation
						if (inputValue === "") {alert("You need to enter something ⚠️")}
						else {
						// Entering input
						setToDos(toDos.concat(inputValue));
						// Eracing the balue in the field after it's been entered
						setInputValue("");}
					}	
				}}
				type="text" placeholder="What do you need to do? 🤔" /></li>

				{toDos.map((item, index) => (
				// Putting the value into the list
				
				<li className="theitem"
					/* Utilizing the hover function with useRef */
					onMouseEnter={() => showTrash.current[index].style.display="inline-block"}
					onMouseLeave={() => showTrash.current[index].style.display="none"}
				>
					<span className="thetask">{item}</span>
					<span className="thetrash">
						<FontAwesomeIcon
						/* Applying the hover function with useRef */
						ref={elementShow => showTrash.current[index] = elementShow}
						style={{display: "none"}}					
						className="trashcant" icon={faTrash} onClick={() => setToDos(toDos.filter((item, currentIndex) => index != currentIndex ))} />
					</span>
				</li>))}
			</ul>
			{/* Checking if there are any tasks */}
			{(toDos.length === 0) ? <NoTasks /> : ""}
			{/* Counting tasks */}
			<div className="counter">
				{toDos.length} {(toDos.length%100 !== 11 && toDos.length % 10 === 1) ? "Task" : "Tasks"}
			</div>
		</div>
	);
};

export default Home;

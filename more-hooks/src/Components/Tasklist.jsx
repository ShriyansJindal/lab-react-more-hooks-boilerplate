// import React from 'react'
import "./Tasklist.css"

import { useEffect, useReducer, useRef } from "react"
let taskReducer=(state,action)=>{
    switch(action.type){
        case "ADD_TASK":
            return[...state,{id:Date.now(),text: action.payload, hidden: false}]
        case"TOGGLE_TASK":
            return state.map((task)=>(task.id === action.payload ? {...task,hidden: !task.hidden} : task))
        default:
            return state;
    }
    }
function Tasklist() {
    const [tasks,dispatch] = useReducer(taskReducer,[])
    let inputRef = useRef()

    useEffect(()=>{
        inputRef.current.focus();
    },[tasks])

    const handleAddTask=(text)=> {
        dispatch({type:"ADD_TASK",payload:text})
    }

    const handleToggleTask=(id)=>{
        // console.log(tasks.id,tasks.payload)
        dispatch({type:"TOGGLE_TASK",payload:id})
        // console.log(id)
    }

    function handlebacktotop(){
        
        // console.log(inputRef.current)
        inputRef.current.focus();
    }
    
  return (
    <div className="container">
        <h2>Daily Tasks</h2>
        <div>
            <input type="text" placeholder="Enter Task" ref={inputRef} onKeyDown={(e)=> e.key==='Enter' && (handleAddTask(e.target.value ),(e.target.value=''))}/>

        </div>
        <ul>
            {tasks.map((el)=>(
                <li key={el.id}>
                    {/* {console.log(el.hidden)} */}
                    <span style={{textDecoration: el.hidden ? "line-through" : "none"}}>
                    {el.hidden ? "Task is hadden":el.text}
                    </span>
                    <button type="button" onClick={()=>handleToggleTask(el.id)}>Toggle</button>
                </li>
            ))}
        </ul>
        <button className="back-to-top" onClick={handlebacktotop}>Back To Top</button>
    </div>
  )
}

export default Tasklist

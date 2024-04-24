import React, { useRef, useState } from 'react'
import '../css/Todo.css'
import TodoItems from './TodoItems';
import { useEffect } from 'react';

let c = 0;
export default function Todo() {
    let [count,setCount]=useState(0);
    const [todos, setTodos] = useState([]);
    const inputref = useRef(null);

    const Add = (e) => {
        c= JSON.parse(localStorage.getItem("count")) ;
        setTodos([...todos, { no: c++, text: inputref.current.value, display: false }]);
        inputref.current.value = null;
        setCount(c);
    }

    useEffect(() => {
         // to avoid setting items to null on refresh
        if(JSON.parse(localStorage.getItem("todos")).length != 0 ){
            setTodos(JSON.parse(localStorage.getItem("todos")));
            setCount(JSON.parse(localStorage.getItem("count")));
        }else{
            setTodos([]);
            setCount(0);
            c=0;
        }
            
    }, [])

    useEffect(() => {
        // storing values to local storage for every 100 milisecon on change on  todo using button click add
        setTimeout(() => {
            localStorage.setItem("count", JSON.stringify(count));
            localStorage.setItem("todos", JSON.stringify(todos));
        }, 100);

    }, [todos])

    return (
        <div className='todo'>
            <div className="todo-header">
                To-Do List
            </div>
            <div className="todo-add">
                <input type="text" placeholder='Add Your Task' className='todo-input' ref={inputref} />
                <div className="todo-add-btn" onClick={Add}> ADD </div>
            </div>
            <div className="todo-list">
                {
                    todos.map((item, index) => {
                        return <TodoItems key={index} no={item.no} text={item.text} display={item.display} setTodos={setTodos} />
                    })
                }
            </div>
        </div>
    )
}
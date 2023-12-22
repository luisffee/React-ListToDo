import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Todo = ({ todo, removeTodo, completeTodo }) => {

    const navigate = useNavigate()

    function handleClick() {
        navigate('/edit/' + todo.id)
    }


    return (
        <div
            className='todo'
            style={{ textDecoration: todo.done ? "line-through" : "" }}
        >
            <div className='content'>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p className='category'>({todo.category})</p>
                <Link onClick={handleClick} className='edit'>Edit</Link>
                <p className='date'>{todo.date}</p>
            </div>
            <div className='actions'>
                <button className='completed' onClick={() => completeTodo(todo.id)}>Completar</button>
                <button className='remove' onClick={() => removeTodo(todo.id)} >x</button>
            </div>
        </div>
    )
}

export default Todo
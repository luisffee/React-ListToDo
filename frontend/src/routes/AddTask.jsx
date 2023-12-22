import React from 'react'
import { useState } from 'react';
import axios from "axios";


const baseUrl = "http://localhost:5000";

function AddTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const addTodo = async () => {
        await axios.post(`${baseUrl}/create_task`, { 'title': title, 'description': description, 'category': category });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo()
        alert('Tarefa adicionada com sucesso')
        setTitle('')
        setDescription('')
        setCategory('')
    }

    return (
        <div>
            <div>
                <h1>Add Task</h1>
            </div>
            <div className='todo-form'>
                <h2>Criar tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Titulo' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input value={description} type="text" placeholder="New description" onChange={(e) => setDescription(e.target.value)} />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>Selecione uma categoria</option>
                        <option value='work'>Trabalho</option>
                        <option value='study'>Estudo</option>
                        <option value='personal'>Pessoal</option>
                    </select>
                    <button type='submit'>Criar</button>
                </form>

            </div>
        </div>
    )
}

export default AddTask
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from "axios";

const baseUrl = "http://localhost:5000";


function EditTask() {
    const { id } = useParams()


    const fetchTodo = async () => {
        const data = await axios.get(`${baseUrl}/tasks/${id}`);
        const { task } = data.data
        setTodo(task)
    };

    const [todo, setTodo] = useState([])
    const [NewTitle, setTitle] = useState('')
    const [NewDescription, setDescription] = useState('')
    const [NewCategory, setCategory] = useState('')

    useEffect(() => {
        fetchTodo()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateTodo()
        alert('Tarefa editada com sucesso')
    }

    const updateTodo = async () => {
        await axios.put(`${baseUrl}/tasks/${id}`, { 'title': NewTitle, 'description': NewDescription, 'category': NewCategory, 'done': todo.done });
        setTodo({
            ...todo,
            title: NewTitle,
            description: NewDescription,
            category: NewCategory
        })

    };

    return (
        <div>
            <div>
                <h1>Edit Task {id}</h1>
            </div>
            <div className='todo'>
                <div className='content'>
                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>
                    <p className='category'>({todo.category})</p>
                    <p className='date'>{todo.date}</p>
                </div>
                <div className='todo-form'>
                    <form onSubmit={handleSubmit}>
                        <input value={NewTitle} type="text" placeholder="New Title" onChange={(e) => setTitle(e.target.value)} />
                        <input value={NewDescription} type="text" placeholder="New description" onChange={(e) => setDescription(e.target.value)} />
                        <select value={NewCategory} onChange={(e) => setCategory(e.target.value)}>
                            <option value="work">Trabalho</option>
                            <option value="study">Estudo</option>
                            <option value="personal">Pessoal</option>
                        </select>
                        <input type="submit" value="Edit Task" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTask
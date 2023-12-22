import { useEffect, useState } from 'react'
import axios from "axios";
import '../App.css'
import Todo from '../components/Todo';
import Search from '../components/Search'
import Filter from '../components/Filter'

const baseUrl = "http://localhost:5000";

function Home() {
    const fetchTodos = async () => {
        const data = await axios.get(`${baseUrl}/tasks`);
        const { tasks } = data.data
        setTodos(tasks)

    }
    useEffect(() => {
        fetchTodos()
    }, [])

    const [todos, setTodos] = useState([])

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('Asc');


    const completeTodo = async (id) => {
        const newTodos = [...todos];
        newTodos.map((todo) => todo.id === id ? todo.done = !todo.done : todo);
        setTodos(newTodos);
        await axios.put(`${baseUrl}/tasks/${id}/complete`);
    };

    const removeTodo = async (id) => {
        await axios.delete(`${baseUrl}/tasks/${id}`);
        const newTodos = [...todos];
        const filteredTodos = newTodos.filter((todo) =>
            todo.id !== id ? todo : null
        );
        setTodos(filteredTodos);
    };




    return (
        <div className='app' >
            <h1>Todo App</h1>
            <Search search={search} setSearch={setSearch} />
            <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
            <div className='todo-list'>
                {todos
                    .filter((todo) =>
                        filter === "All"
                            ? true
                            : filter === "Completed"
                                ? todo.done
                                : !todo.done
                    )
                    .filter((todo) =>
                        todo.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .sort((a, b) => sort === "Asc"
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title))
                    .map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            removeTodo={removeTodo}
                            completeTodo={completeTodo} />
                    ))}
            </div>
        </div>
    );
}

export default Home

import { useNavigate } from 'react-router-dom'

const Search = ({ search, setSearch }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/add')
    }

    return (
        <div className="search">
            <h2>Pesquisar:</h2>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite para pesquisar"
            />
            <button onClick={handleClick} >Criar nova task</button>
        </div>
    )
}

export default Search
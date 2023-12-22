import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <div>
      <Link to='/' >Home</Link>
      <Outlet />
    </div>
  );
}

export default App

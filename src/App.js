import './App.css';
import React from 'react'
import Nav from './Components/Nav/Nav';
import routes from './routes';
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation()
  return (
    <div className='app-component'>
      {location.pathname !== "/" ? <Nav/> : null}
      {routes}
    </div>
  );
}

export default App;

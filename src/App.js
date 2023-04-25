import './App.css';
import { useState } from 'react';
import Form from './Components/Form/Form';
import Login from './Components/Login/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setLoggedIn(false);
  };
  
  return (
    <div className="App">
      {
        loggedIn ? (
        <Form onLogoutSuccess={handleLogoutSuccess} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      
    </div>    
     
  );
}

export default App;

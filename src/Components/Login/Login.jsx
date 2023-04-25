import { useState } from 'react';
import { auth } from './Firebase';
import './Login.css'

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert("login succesfully");
      props.onLoginSuccess();
    } catch (error) {
      console.error(error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <form className='login-form' onSubmit={handleLogin}>
     <h2>Login Form</h2>
      <div className="fields">
        <input className="login-input" type="email"
          value={email} onChange={(e) => setEmail(e.target.value)}
           placeholder='Enter your Email' required />

        <input className="login-input" type="password"
          value={password} onChange={(e) => setPassword(e.target.value)} 
         placeholder='Enter your password' required />

        <button className="login-button" type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

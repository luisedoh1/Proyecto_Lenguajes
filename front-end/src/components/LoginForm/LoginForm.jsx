import { useState } from 'react';
import axios from 'axios';
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/authSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!username || !password) {
      return alert("Please enter username and password");
    }

    try {
      const response = await axios.get('https://luisedoh1-001-site1.etempurl.com/User/authenticate', {
        params: {
          email: username,
          password: password
        }
      });

      if (response.data) {
        const userRole = response.data.role;
        const idUsuario = response.data.userid
        console.log(idUsuario)
        localStorage.setItem('idUsuario', idUsuario)
        const userid = localStorage.getItem('idUsuario')
        console.log(userid)
        dispatch(logIn({ role: userRole }));
        if (userRole === 'admin') {
          navigate('/admin/list');
        } else if (userRole === 'sales') {
          navigate('/sales/dashboard');
        } else if (userRole === 'client') {
          navigate('/');
        } else {
          setError('Unknown role. Please contact support.');
        }
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('Error during authentication. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-header">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="submitButton" type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
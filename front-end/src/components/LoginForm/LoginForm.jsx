import { useState } from 'react';
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/authSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username && !password) {
      return alert("Please enter username and password");
    } else if (username === 'test@gmail.com' && password === 'user123') {
      dispatch(logIn({ role: 'admin' }));
      navigate('/admin/list');
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-header">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="submitButton" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

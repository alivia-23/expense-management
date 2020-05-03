import React, { useState } from 'react';
import { fetchCreateSession } from '../utils/services';
import statusMessages from '../utils/statusMessages';
import spinner from '../spinner.svg';

const Login = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const performLogin = () => {
    if(!username || username.trim().length === 0
          || !password || password.trim().length === 0) {
      setError(statusMessages['LOGIN_EMPTY']);
      return;
    }
    setError('');
    setIsLoading(true);
    fetchCreateSession(username)
    .then( (response) => {
      setError('');
      onLogin(response['data']);
    })
    .catch( (err) => {
      setError(statusMessages[err.message || 'DEFAULT']);
      setIsLoading(false);
    });
  };

  return (
    <div className="login">
      <p className="error">{error}</p>
      <div>
      <label>Username : </label><input onChange={ (e) => setUsername(e.target.value) }/> <br></br>
      <label>Password : </label><input type="password" onChange={ (e) => setPassword(e.target.value) }/>
        <div>
        { isLoading ?
            <img alt="spinner" src={spinner}/> :
            <button onClick={ performLogin }>Login</button>
        }
        </div>
      </div>
    </div>
  );

};

export default Login;

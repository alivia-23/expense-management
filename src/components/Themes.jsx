import React, {useContext} from 'react';

import { ThemeContext } from '../ThemeContext';

import { fetchUpdateTheme } from '../utils/services';
import statusMessages from '../utils/statusMessages';

const Themes = ({ user, onError }) => {

  const { refreshTheme } = useContext(ThemeContext);
  const changeTheme = (value) => {
     fetchUpdateTheme(user.username, value)
     .then( () => {
        refreshTheme(value);
     })
     .catch( (err) => {
       onError(statusMessages[err.message || 'DEFAULT']);
     })
  }

  return (
    <div className="themes">
      Theme:
      <select className="themes-select" value={user.theme} onChange={ e => changeTheme(e.target.value) }>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
    </div>
  );
};

export default Themes;

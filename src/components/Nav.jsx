import React from 'react';
import { fetchRemoveSession } from '../utils/services';

const Nav = ({ user, onLogout, onAddNav, onHomeNav, onSummaryNav }) => {

  const logout = () => {
    fetchRemoveSession()
    .then( () => onLogout() );
  };

  const homeNav = () => {
    onHomeNav();
  };

  const addNav = () => {
    onAddNav();
  };

  const summaryNav = () => {
    onSummaryNav();
  };

  return (
    <ul className='nav'>
      <li>{user.username}</li>
      <li className="home action" onClick={homeNav}>Home</li>
      <li className="add action" onClick={addNav}>Add Expense</li>
      <li className="summary action" onClick={summaryNav}>Summary</li>
      <li className="logout action" onClick={logout}>Logout</li>
    </ul>
  );
};

export default Nav;

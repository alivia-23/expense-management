import React, { useState, useEffect, useReducer } from 'react';

import Login from './components/Login';
import AppTitle from './components/AppTitle';
import AddExpense from './components/AddExpense';
import ViewExpense from './components/ViewExpense';
import Summary from './components/Summary';
import Nav from './components/Nav';
import ExpensesHome from './components/ExpensesHome';

import Themes from './components/Themes';
import { ThemeContext, themes } from './ThemeContext';

import { fetchGetSession, fetchReadAllExpenses } from './utils/services';
import statusMessages from './utils/statusMessages';
import expensesReducer from './reducer/expensesReducer';
import './style/expense.css';

function App() {

  const defaultTheme = 'light';
  const [user, setUser] = useState({ isLoggedIn: false, theme: defaultTheme });
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [expense, setExpense] = useState({});
  const [index, setIndex] = useState(-1);
  const [allExpenses, setAllExpenses] = useState([]);

  const initialState = {
    expenses: []
  }
  const [state, dispatch] = useReducer(expensesReducer, initialState);

  useEffect( () => {
     fetchGetSession()
     .then( response => {
       let user = response['data'];
       setUser({
         ...user, isLoggedIn: true
       });
       setBodyColor(user.theme);
       setError("");
     })
     .catch( (err) => {
        setError(statusMessages[err.message || 'DEFAULT']);
     });
   }, []);

  useEffect( () => {
     if(user.isLoggedIn) {
       fetchReadAllExpenses(user.username)
       .then( response => {
         dispatch({
           type: 'loadAllExpenses',
           expenses: Object.values(response['data'])
         });
         setError("");
         setCurrentPage('home');
       })
       .catch( (err) => {
         setError(statusMessages[err.message || 'DEFAULT']);
       });
     }
  }, [user]);

  const setBodyColor = (theme) => {
    document.body.style.backgroundColor = themes[theme]['bodyBackground'];
  }

  const refreshTheme = (theme) => {
    setUser({
      ...user, theme: theme
    });
    setBodyColor(theme);
  }

  const login = (user) => {
     setUser({
       ...user, isLoggedIn: true
     });
     setBodyColor(user.theme);
     setError('');
  };

  const logout = () => {
    setUser({
      isLoggedIn: false, theme: defaultTheme
    });
    dispatch({
      type: 'logout'
    });
    setBodyColor(defaultTheme);
    setError("");
    //setCurrentPage('home');
  };

  const onAddSuccess = () => {
    setCurrentPage('home');
    setError("");
  };

  const onError = (error) => {
    setError(error);
  };

  const onEdit = (expense, index) => {
    setCurrentPage('add');
    setExpense(expense);
    setIndex(index);
  }

  const onViewDetailsNav = (expense) => {
    setExpense(expense);
    setCurrentPage('view');
    setError("");
  }

  const onHomeNav = () => {
    loadAllExpenses();
  };

  const loadAllExpenses = () => {
    fetchReadAllExpenses(user.username)
    .then( response => {
      dispatch({
        type: 'loadAllExpenses',
        expenses: Object.values(response['data'])
      });
      setError("");
      setCurrentPage('home');
    })
    .catch( (err) => {
      setError(statusMessages[err.message || 'DEFAULT']);
    });
  }

  const onAddNav = () => {
    setCurrentPage('add');
    setExpense({});
    setError("");
  };

  const onSearchNav = () => {
    setCurrentPage('search');
    setError("");
  };

  const onSummaryNav = () => {
    fetchReadAllExpenses(user.username)
    .then( response => {
      setAllExpenses(Object.values(response['data']));
      setError("");
      setCurrentPage('summary');
      setError("");
    })
    .catch( (err) => {
      setError(statusMessages[err.message || 'DEFAULT']);
    });
  };

  let content;
  if(user.isLoggedIn) {
    content =
       <div>
          <Themes user={user} onError={onError} />
          <div className="error">{error}</div>
          {currentPage === 'add' && <AddExpense expense={expense} user={user} index={index}
                                                onAddSuccess={onAddSuccess} onError={onError}
                                                dispatch={dispatch} onCancel={onHomeNav} />}
          {currentPage === 'view' && <ViewExpense expense={expense} onBack={onHomeNav} />}
          {currentPage === 'summary' && <Summary expenses={allExpenses} />}
          {currentPage === 'home' && <ExpensesHome user={user} expenses={state.expenses} dispatch={dispatch}
                           onError={onError} onEdit={onEdit} onViewDetailsNav={onViewDetailsNav} /> }
       </div>

  } else {
      content = <Login onLogin={login} />
  }


  return (
    <div className="App">
      <ThemeContext.Provider value={  {theme: user.theme, themes, refreshTheme} }>
         { user.isLoggedIn && <Nav user={user} onLogout={logout} onAddNav={onAddNav} onSearchNav={onSearchNav} onHomeNav={onHomeNav} onSummaryNav={onSummaryNav} /> }
         <AppTitle />
         {content}
      </ThemeContext.Provider>
    </div>
  );
};

export default App;

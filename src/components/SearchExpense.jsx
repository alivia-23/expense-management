import React, {useState, useContext} from 'react';
import {fetchReadFilteredExpenses, fetchReadAllExpenses} from '../utils/services';
import categories from '../utils/categories';
import statusMessages from '../utils/statusMessages';
import { ThemeContext }  from '../ThemeContext';

const SearchExpense = ({user, dispatch, onError}) => {

  const { theme, themes } = useContext(ThemeContext);
  const buttonStyle = themes[theme]['buttonStyle'];

  const [filterCriteria, setFilterCriteria] = useState({
     category: "0",
     name: "",
     startDate: "",
     endDate: ""
  });

  const loadAll = () => {
    performReset();
    fetchReadAllExpenses(user.username)
    .then( (response) => {
      dispatch({
        type: 'refresh',
        expenses: Object.values(response['data'])
      });
    })
    .catch( (err) => {
       onError(statusMessages[err.message || 'DEFAULT']);
    });
  }

  const performSearch = () => {
    if(!validate()) {
      onError(statusMessages['EMPTY_SEARCH']);
      return;
    }
    onError("");
    fetchReadFilteredExpenses(user.username, filterCriteria)
    .then( response => {
      dispatch({
        type: 'loadAllExpenses',
        expenses: Object.values(response['data'])
      });
    })
    .catch( (err) => {
      onError(statusMessages[err.message || 'DEFAULT']);
    });
  }

  const performReset = () => {
    const resetState = {
      category: "0",
      name: "",
      startDate: "",
      endDate: ""
    }
    setFilterCriteria(resetState);
  }

  const validate = () => {
    if( filterCriteria.category === "0" &&
            filterCriteria.name.trim().length === 0 &&
            filterCriteria.startDate.trim().length === 0 &&
            filterCriteria.endDate.trim().length === 0
           ) {
      return false;
    }
    return true;
  }

  return (
    <div className="search-expense">
       <div>
         <label>Category : </label>
           <select value={filterCriteria.category} onChange={ e => setFilterCriteria({...filterCriteria, category: e.target.value})} >
             <option value="0">--Select--</option>
             { Object.keys(categories).map(
                    category => (<option key={category} value={category}>{category}</option>)
               )
             }
           </select>
         <label> Name : </label><input type="text" value={filterCriteria.name} onChange={ e => setFilterCriteria({...filterCriteria, name: e.target.value}) }/>
       </div>
       <div>
          Date Between:
          <input type="date" value={filterCriteria.startDate} onChange={ e => setFilterCriteria({...filterCriteria, startDate: e.target.value}) }/>
          and
          <input type="date" value={filterCriteria.endDate} onChange={ e => setFilterCriteria({...filterCriteria, endDate: e.target.value}) }/>
       </div>
        <div>
          <span><button className={buttonStyle} onClick={ () => performSearch() } >Search</button></span>
          <span><button className={buttonStyle} onClick={ () => loadAll() } >Load All</button></span>
        </div>
    </div>
  );
};

export default SearchExpense;

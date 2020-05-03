import React,{useState, useContext} from 'react';
import { fetchRemoveAllExpenses } from '../utils/services';
import statusMessages from '../utils/statusMessages';
import { ThemeContext }  from '../ThemeContext';

const Controls = ({user, dispatch, onError}) => {

  const[sortBy, setSortBy] = useState("amount");
  const[order, setOrder] = useState("asc");
  const { theme, themes } = useContext(ThemeContext);
  const buttonStyle = themes[theme]['buttonStyle'];

  const sort = () => {
    dispatch({
      type: 'sort',
      sortBy: sortBy,
      order: order
    });
  }

  const removeAll = () => {
    fetchRemoveAllExpenses(user.username)
    .then( (response) => {
      dispatch({
        type: 'removeAll'
      });
    })
    .catch( (err) => {
       onError(statusMessages[err.message]);
    });
  }

  return (
    <div className="controls">
      <div className="sort">
          <span>
          Sort By:
            <select value={sortBy} onChange={ (e) => setSortBy(e.target.value)}>
              <option value="amount">Amount</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="date">Date</option>
            </select>
          </span>

          <span>
          Order:
            <select value={order} onChange={ (e) => setOrder(e.target.value)}>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </span>

          <span>
            <button className={buttonStyle} onClick={ () => sort() } >Sort</button>
          </span>
      </div>
      <div className="remove-all">
        <span>
          <button className={buttonStyle} onClick={ (e) => removeAll(e) } >Delete All</button>
        </span>
      </div>
    </div>
  );
};

export default Controls;

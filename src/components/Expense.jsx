import React from 'react';
import statusMessages from '../utils/statusMessages';
import { fetchRemoveOneExpense } from '../utils/services';

const Expense = ({ user, expense, index, dispatch, onEdit, onViewDetailsNav, onError }) => {

  const onEditClick = () => {
    onEdit(expense, index);
  }

  const deleteExpense = (expenseId) => {
    fetchRemoveOneExpense(user.username, expenseId)
    .then( (response) => {
      const deletedExpense = response['data'];
      dispatch({
        type: 'deleteExpense',
        deletedExpense: deletedExpense
      });
    })
    .catch( (err) => {
      onError(statusMessages[err.message]);
    });
  }

  const performViewDetails = () => {
    onViewDetailsNav(expense);
  }

  return (
        <li className="view-expense-row" key={expense.expenseId}>
          <div>
              <div className="view-expense-category"> {expense.category} </div>
              <div className="view-expense-name"><button className="expense-name-link" onClick={ () => performViewDetails()}>{expense.name}</button></div>
              <div className="view-expense-amount"> {expense.amount} </div>
              <div className="view-expense-date"> {expense.date} </div>
              <div className="view-expense-edit"><button onClick={ () => onEditClick() }>Edit</button> </div>
              <div className="view-expense-delete"><button className="delete-button" onClick={ () => deleteExpense(expense.expenseId) }>Delete</button> </div>
          </div>
        </li>
  );
};

export default Expense;

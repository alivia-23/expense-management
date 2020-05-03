import React from 'react';
import Expense from './Expense';

const ExpenseList = ({expenses, user, dispatch, onEdit, onViewDetailsNav, onError }) => {
  return (
    <div>
      <div className="expense-header-row">
        <div className="expense-category-header"><h3>Category</h3></div>
        <div className="expense-name-header"><h3>Name</h3></div>
        <div className="expense-amount-header"><h3>Amount</h3></div>
        <div className="expense-date-header"><h3>Date</h3></div>
      </div>
      <div>
        <ul className="view-expense-list">
           {expenses.map((expense, index) =>  (
              <Expense key={expense.expenseId} user={user} expense={expense} index={index} dispatch={dispatch}
                       onEdit={onEdit} onViewDetailsNav={onViewDetailsNav} onError={onError} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;

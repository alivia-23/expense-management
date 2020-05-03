import React from 'react';
import Controls from './Controls';
import SearchExpense from './SearchExpense';
import ExpenseList from './ExpenseList';

const ExpensesHome = ({ user, expenses, dispatch, onError, onEdit, onViewDetailsNav }) => {
  return (
    <div>
      <SearchExpense user={user} dispatch={dispatch} onError={onError} />
      <br></br>
      <Controls user={user} dispatch={dispatch} onError={onError} />
      <br></br>
      <br></br>
      {expenses.length > 0 ? <ExpenseList user={user} expenses={expenses}
                                                 dispatch={dispatch} onEdit={onEdit}
                                                 onViewDetailsNav={onViewDetailsNav}
                                                 onError={onError} />
                           : <div className="no-expenses">No expenses found</div>}
    </div>
  );
};

export default ExpensesHome;

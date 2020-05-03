import React, { useState, useContext } from 'react';
import { ThemeContext }  from '../ThemeContext';

import { fetchAddOneExpense, fetchUpdateOneExpense } from '../utils/services';
import statusMessages from '../utils/statusMessages';
import { validateExpense } from '../utils/expenseValidation';
import categories from '../utils/categories';

const AddExpense = ({ user, expense, index, dispatch, onAddSuccess, onError, onCancel }) => {
   const { theme, themes } = useContext(ThemeContext);
   const buttonStyle = themes[theme]['buttonStyle'];
   const [updatedExpense, setUpdatedExpense] = useState(expense);

   const setAmount = (e) => {
     const amount = isNaN(e.target.value) ? 0 : e.target.value;
     setUpdatedExpense({...updatedExpense, amount: Number(amount)})
   };

   const performCancel = (e) => {
     onCancel();
   };

   const onSave = (e) => {
     e.preventDefault();
     const validation = validateExpense(updatedExpense);
     if(validation.status) {
        saveExpense();
     } else {
        onError(statusMessages[validation.message]);
     }
   };

   const saveExpense = () => {
     if(!updatedExpense.expenseId) {
       addExpense();
     } else {
       updateExpense();
     }
   };

   const addExpense = () => {
     fetchAddOneExpense(user.username, updatedExpense)
     .then( (response) => {
       dispatch({
         type: 'addExpense',
         expense: response['data']
       });
       onAddSuccess();
     })
     .catch( (err) => {
       onError(statusMessages[err.message]);
     });
   };

   const updateExpense = () => {
     fetchUpdateOneExpense(user.username, updatedExpense.expenseId, updatedExpense)
     .then( (response) => {
       dispatch({
         type: 'updateExpense',
         expense: response['data'],
         index: index
       });
       onAddSuccess();
     })
     .catch( (err) => {
        onError(statusMessages[err.message]);
     });
   };

   return (
    <div className="add-text">
        <form className="add-expense-form">
            <label>Category* : </label>
            <select value={updatedExpense.category} onChange={ e => setUpdatedExpense({...updatedExpense, category: e.target.value}) } >
              <option value="0">--Select--</option>
              { Object.keys(categories).map(
                     category => (<option key={category} value={category}>{category}</option>)
                 )
              }
             </select>
            <br></br>
            <br></br>
            <label>Expense name* : </label>
            <input className="to-add" type="text" value={updatedExpense.name} placeholder="Enter expense name" onChange={ e => setUpdatedExpense({...updatedExpense, name: e.target.value}) } />
            <br></br>
            <br></br>
            <label>Amount* : $</label>
            <input className="to-add" type="text" value={updatedExpense.amount} placeholder="Enter your amount" onChange={ setAmount } />
            <br></br>
            <br></br>
            <label>Date* : </label>
            <input type="date" value={updatedExpense.date} onChange={ e => setUpdatedExpense({...updatedExpense, date: e.target.value}) } />
            <br></br>
            <br></br>
            <label>Comments : (Optional)</label>
            <textarea className="comments" value={updatedExpense.comments} cols="30" rows="5" placeholder="Enter your expense details" onChange={ e => setUpdatedExpense({...updatedExpense, comments: e.target.value}) }></textarea>
            <br></br>
            <br></br>
            <span>
              <span><button className={buttonStyle} onClick={ (e) => onSave(e) } >Save</button></span>
              <span><button className={buttonStyle} onClick={ (e) => performCancel(e) } >Cancel</button></span>
            </span>
        </form>
    </div>
  );
};

export default AddExpense;

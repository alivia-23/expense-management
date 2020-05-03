import React, { useContext } from 'react';
import { ThemeContext }  from '../ThemeContext';

const ViewExpense = ({ expense, onBack }) => {

   const { theme, themes } = useContext(ThemeContext);
   const buttonStyle = themes[theme]['buttonStyle'];

   const performBackNav = () => {
     onBack();
   }

   return (
     <div className="expense-list">
         <span>  Category: {expense.category} </span><br></br>
         <span>  Expense name: {expense.name} </span><br></br>
         <span>  Expense Amount: {expense.amount} </span><br></br>
         <span>  Date: {expense.date} </span><br></br>
         <span>  Comments: {expense.comments} </span>
         <div><button className={buttonStyle} onClick={ () => performBackNav() }>Back</button> </div>
     </div>
   );
};

export default ViewExpense;

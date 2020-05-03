import React from 'react';
import { Pie } from 'react-chartjs-2';
import categories from '../utils/categories';
import { groupByCategory, getMaxExpense, getTotalExpense } from '../utils/expenseSummary'

const Summary = ({ expenses }) => {
  const expenseGroups = groupByCategory(expenses);
  const maxExpense = getMaxExpense(expenses);
  const expenseCategories = Object.keys(expenseGroups);
  const totalExpense = getTotalExpense(expenses);
  const data = {
    labels: expenseCategories,
    datasets: [{
      data: expenseCategories.map( category => expenseGroups[category]),
      backgroundColor: expenseCategories.map( category => categories[category].color)
    }]
  }
  return (
    <div>
      { expenses.length > 0 ?
          <div className="summary-details">
            <div className="summary-total-expense"> Total expenses: ${totalExpense} </div>
            <div className="summary-max-expense"> Maximum expense of ${maxExpense.amount} occured on {maxExpense.date} </div>
            <br></br>
            <div className="category-distribution-title">Expenses by category</div>
            <div className="category-distribution">
              <div className="category-distribution-list">
                  <ul>
                     {
                       Object.keys(expenseGroups).map((category) =>  (
                         <div>
                           <li>{category}  {expenseGroups[category]}</li>
                         </div>
                      ))
                    }
                  </ul>
              </div>
              <div className="category-distribution-pie">
                <br></br>
                <div>
                  <Pie data={{
                    labels: data.labels,
                    datasets: data.datasets
                  }}/>
                 </div>
              </div>
              </div>
          </div>
          :<div className="no-expenses">No expenses found</div>
     }
   </div>
  );
};

export default Summary;

export const groupByCategory = (expenses) => {
  const groups = {};
  expenses.map( expense => {
    if(expense.category in groups) {
      groups[expense.category] =
            groups[expense.category] + Number(expense.amount);
    } else {
      groups[expense.category] = Number(expense.amount);
    }
  });
  return groups;
}

export const getMaxExpense = (expenses) => {
  let maxExpense = { amount: 0 };
  expenses.map( expense => {
    if(expense.amount > maxExpense.amount) {
      maxExpense = {...expense};
    }
  });
  return maxExpense;
}

export const getTotalExpense = (expenses) => {
  let totalExpense = 0;
  expenses.map( expense => {
    totalExpense += expense.amount;
  });
  return totalExpense;
};

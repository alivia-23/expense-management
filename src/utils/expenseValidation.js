export const validateExpense = (expense) => {
  if(!expense.category || !expense.category  === "0") {
    return {status: false, message: 'NO_CATEGORY'};
  }
  if(!expense.name) {
    return {status: false, message: 'EMPTY_EXPENSENAME'}
  }
  if(expense.name && expense.name.length > 100) {
    return {status: false, message: 'EXPENSE_NAME_LENGTH'};
  }
  if(!expense.amount && expense.amount !== 0) {
    return {status: false, message: 'EMPTY_AMOUNT'}
  }
  if(!expense.amount || isNaN(expense.amount) || expense.amount <= 0) {
    return {status: false, message: 'VALID_AMOUNT'};
  }
  if(!expense.date) {
    return {status: false, message: 'EMPTY_DATE'};
  }
  if(expense.date && new Date(expense.date) > new Date()) {
    return {status: false, message: 'FUTURE_DATE'};
  }
  return {status: true};
};

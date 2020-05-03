const { v4: uuidv4 } = require('uuid');

const expenses = {};

const addExpense = ({username, expense}) => {
  expenses[username] = expenses[username] || {};
  const expenseId = uuidv4();
  expenses[username][expenseId] = { ...expense, expenseId };
  return expenses[username][expenseId];
};

const readExpense = ({username, expenseId}) => {
  if(!expenses[username]) {
    return {};
  }
  return expenses[username][expenseId];
};

const readAll = (username) => {
  if(!expenses[username]) {
    return {};
  }
  return expenses[username];
};

const readFiltered = (username, filterCriteria) => {
  if(!expenses[username]) {
    return {};
  }
  const allExpenses = expenses[username];
  let filteredExpensIds = Object.keys(allExpenses);
  if(filterCriteria.name && filterCriteria.name.trim().length > 0) {
     filteredExpensIds = filteredExpensIds.filter( id => allExpenses[id].name.includes(filterCriteria.name));
  }
  if(filterCriteria.category && filterCriteria.category !== "0") {
     filteredExpensIds = filteredExpensIds.filter( id => allExpenses[id].category === filterCriteria.category);
  }
  if(filterCriteria.startDate) {
     filteredExpensIds = filteredExpensIds.filter( id => new Date(allExpenses[id].date) > new Date(filterCriteria.startDate));
  }
  if(filterCriteria.endDate) {
     filteredExpensIds = filteredExpensIds.filter( id => new Date(allExpenses[id].date) < new Date(filterCriteria.endDate));
  }
  const filteredExpenses = {};
  filteredExpensIds.map( id => {
    filteredExpenses[id] = allExpenses[id];
  })
  return filteredExpenses;
};

const replaceExpense = ({ username, expenseId, expense }) => {
  if(!expenses[username] || !expenses[username][expenseId]) {
    return;
  }
  expenses[username][expenseId] = { ...expense, expenseId };
  return expenses[username][expenseId];
};

const removeExpense = ({ username, expenseId }) => {
  if(!expenses[username]) {
    return;
  }
  const expense = expenses[username][expenseId];
  delete expenses[username][expenseId];
  return expense;
};

const removeAll = (username) => {
  const all = expenses[username];
  expenses[username] = {};
  return all;
};

const validateRequiredExpense = (expense) => {
  if(!expense.category || expense.category === "0" ||
     !expense.name || expense.name.trim().length === 0 ||
     !expense.amount || expense.amount === 0 ||
     !expense.date
    ) {
    return false;
  }
  return true;
};

const validateAmount = (expense) => {
  if(!expense.amount || isNaN(expense.amount) || expense.amount < 0) {
    return false;
  }
  return true;
}

module.exports = {
  addExpense,
  readExpense,
  replaceExpense,
  removeExpense,
  readAll,
  readFiltered,
  removeAll,
  validateRequiredExpense,
  validateAmount
};

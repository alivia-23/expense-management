const expensesReducer = (state, action) => {
   switch(action.type) {
     case 'loadAllExpenses':
         return {...state, expenses: action.expenses};
     case 'addExpense':
         return {...state, expenses: [...state.expenses, action.expense]};
     case 'updateExpense':
        const newExpenses = [...state.expenses];
        newExpenses[action.index] = action.expense;
        return {...state, expenses: newExpenses};
     case 'deleteExpense':
        const newExpensesAfterDelete = [...state.expenses].filter( expense => expense.expenseId !== action.deletedExpense.expenseId);
        return {...state, expenses: newExpensesAfterDelete};
     case 'sort':
        const sortBy = action.sortBy;
        const order = action.order;
        const sortFunction =  order === 'desc' ? (a, b) => (a[sortBy] < b[sortBy] ? 1 : -1) : ((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
        return {...state, expenses: [...state.expenses].sort(sortFunction)};
     case 'refresh':
        return {...state, expenses: action.expenses};
     case 'removeAll':
        return {...state, expenses: []};
     default:
        return state;
   }
};

export default expensesReducer;

const statusMessages = {
  DEFAULT : 'Oh no!  Something went wrong, please try again',
  VALID_USERNAME : 'Username cannot be dog or empty',
  NETWORK_ERROR : 'There was a problem reaching your network, please try again',
  LOGIN_EMPTY : 'Username and password cannot be empty',
  LOGIN_REQUIRED : 'You must be logged in to view this content',
  LOGIN_UNAUTHORIZED : 'You are not permitted to view this content',
  EMPTY_EXPENSENAME : 'Expense name cannot be empty',
  EXPENSE_NAME_LENGTH : 'Expense name cannot be greater than 100 characters',
  LOGIN_DENIED : 'Username must be between 2-20 chracters and start with [A-Za-z0-9_-]',
  NO_VALID_SESSION : 'Your session has expired',
  ACTION_NOT_PERMITTED :  'This action is not permitted',
  NO_EXPENSE_FOR_USER : 'There is no such task' ,
  NO_SUCH_EXPENSEID : 'Invalid expense',
  FAILED_TO_UPDATE : 'Update failed',
  NO_CATEGORY : 'Category selection required',
  EMPTY_AMOUNT : 'Amount should not be blank',
  EMPTY_DATE: 'Date cannot be blank',
  FUTURE_DATE: 'Date cannot be in future',
  EMPTY_PASSWORD: 'Password cannot be empty',
  EMPTY_SEARCH: 'Please enter at least one search criteria',
  MISSING_EXPENSE_DATA : 'Category, name, amount, date are mandatory',
  VALID_AMOUNT : 'Amount must be a number and greater than 0'
};

export default statusMessages;

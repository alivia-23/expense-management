
## Student Expense Management
This is an expense management application built using React for University students to track their expenses. The application  allows students to add, edit and delete expenses. Expenses can be sorted by various attributes. The application also provides a summary of the expenditures grouped by category.

### Setup locally

* `npm install` will install the required dependencies to run this application
* `npm start` will start the server
* The application can be accessed at `localhost:5000`

### Feature details

#### Login
* Username should contain only letters or digits or underscore or hyphen. Username cannot be dog.
* A password should be entered but is not checked.

#### Home
* Displays all the expenses that were added.
* Clicking on expense name hyperlink will show the expense `details` on a separate page.
* User can search expenses based on category or name or dates and clicking `Search`. At least one of the fields needs to be specified for the search.
* Allows loading of all expenses by clicking on `Load All`
* Allows removal of all expenses by clicking on `Delete All`
* Expenses can be edited or deleted by clicking the `Edit` and `Delete` buttons respectively.
* Allow the user to `sort` the expense by expense name, category, amount, date (alphabetically, numerical both ascending and descending)

#### Theme
* Allows modification of `theme` preference to light or dark.
* Depending on the stored theme, the application will changes the background and the button colors.

#### Add expense
* A new expense can be added here.
* Category, expense name, amount and date are required to add a expense.
* Expense date should be in past.
* Amount should be greater than 0 and a number.

#### Summary
* Summary page shows a pie chart of all expenses group by category.
* It also displays the total expenses and maximum expense.
* react-chartjs-2 has been used to display a pie chart with approval from the Professor.

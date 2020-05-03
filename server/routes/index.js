const session = require('../session');
const theme = require('../theme');
const expenses = require('../expenses');
const auth = require('../auth');

const web = (res) => {
  return ({ message, status, data }={}) => {
    if(!message && !data) {
      data = 'OK';
    }
    res.status(status || 200).json({ message, data });
  };
};

const routes = {
  session: { },
  theme: { },
  expenses: {
    one: {},
    all: {},
    filter: {}
  },
};

// Session
routes.session.status = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }
  web(res)({ data: session.getSession(sid) } );
};

routes.session.create = ( req, res ) => {
  const username = req.body.username;
  const sessionInfo = session.attemptCreate(username);
  if(!sessionInfo) {
    web(res)({ status: 403, message: 'LOGIN_DENIED' });
    return;
  }
  if(!auth.isPermitted(username)) {
    web(res)({ status: 403, message: 'VALID_USERNAME'  });
    return;
  }
  res.cookie('sid', sessionInfo.sid, { MaxAge: 1000*60 } );
  web(res)({data: sessionInfo});
};

routes.session.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION' });
    return;
  }
  res.clearCookie('sid');
  session.remove(sid);
  web(res)();
};

// Theme
routes.theme.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }
  const foundTheme = theme.getTheme(username);
  web(res)({ data: foundTheme });
};

routes.theme.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const themeValue = req.body.theme;
  theme.setTheme({ username, theme: themeValue});
  web(res)();
};

// Expenses
routes.expenses.filter.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }
  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }
  const filterCriteria = req.body.filterCriteria;
  web(res)({ data: expenses.readFiltered(username, filterCriteria) } );
};

routes.expenses.all.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  web(res)({ data: expenses.readAll(username) } );
};

routes.expenses.all.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const all = expenses.removeAll(username);
  if(!all) {
    web(res)({ status: 404, message: 'NO_EXPENSE_FOR_USER' });
    return;
  }

  web(res)({ data: all } );
};

routes.expenses.one.add = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const expense = req.body.expense;
  if(!expenses.validateRequiredExpense(expense)) {
    web(res)({status: 400, message: 'MISSING_EXPENSE_DATA' });
  }
  if(!expenses.validateAmount(expense)) {
    web(res)({status: 400, message: 'VALID_AMOUNT' });
  }
  web(res)({ data: expenses.addExpense({ username, expense })});
};

routes.expenses.one.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const expenseId = req.params.expenseId;
  const expense = expenses.readExpense({ username, expenseId });
  if(!expense) {
    web(res)({ status: 404, message:  'NO_SUCH_EXPENSEID'  });
    return;
  }
  web(res)({ data: expense } );
};

routes.expenses.one.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const expenseId = req.params.expenseId;
  const expense = req.body.expense;
  if(!expenses.validateRequiredExpense(expense)) {
    web(res)({status: 400, message: 'MISSING_EXPENSE_DATA' });
  }
  if(!expenses.validateAmount(expense)) {
    web(res)({status: 400, message: 'VALID_AMOUNT' });
  }

  const newExpense = expenses.replaceExpense({ username, expenseId, expense });
  if(!newExpense) {
    web(res)({ status: 400, message: 'FAILED_TO_UPDATE' });
    return;
  }
  web(res)({ data: newExpense } );
};

routes.expenses.one.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'NO_VALID_SESSION'  });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const expenseId = req.params.expenseId;
  const expense = expenses.removeExpense({ username, expenseId });
  if(!expense) {
    web(res)({ status: 404, message:  'NO_SUCH_EXPENSEID'  });
    return;
  }
  web(res)({ data: expense } );
};

module.exports = routes;

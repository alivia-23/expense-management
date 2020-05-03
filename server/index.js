const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.remove);

app.get('/theme/:username', routes.theme.read);
app.put('/theme/:username', routes.theme.update);

app.get('/expenses/:username', routes.expenses.all.read);
app.delete('/expenses/:username', routes.expenses.all.remove);
app.post('/expenses/filter/:username/', routes.expenses.filter.read);
app.post('/expenses/:username', routes.expenses.one.add);
app.get('/expenses/:username/:expenseId', routes.expenses.one.read);
app.put('/expenses/:username/:expenseId', routes.expenses.one.update);
app.delete('/expenses/:username/:expenseId', routes.expenses.one.remove);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );

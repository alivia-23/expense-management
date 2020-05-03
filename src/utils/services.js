const convertNetworkError = (err) => {
  return {
    message: 'NETWORK-ERROR',
    err
  };
};

const convertServiceError = (err) => Promise.reject(err);

export const fetchGetSession = (username) => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchCreateSession = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchRemoveSession = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
  .catch( convertNetworkError)
  .then( response => {
    return response.ok;
  });
};

export const fetchReadTheme = (username) => {
  return fetch(`/theme/${username}`, {
    method: 'GET'
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchUpdateTheme = (username, theme) => {
  return fetch(`/theme/${username}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ theme })
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchReadAllExpenses = (username) => {
  return fetch(`/expenses/${username}`, {
    method: 'GET',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchReadFilteredExpenses = (username, filterCriteria) => {
  return fetch(`/expenses/filter/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ filterCriteria })
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchRemoveAllExpenses = (username) => {
  return fetch(`/expenses/${username}`, {
    method: 'DELETE',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchAddOneExpense = (username, expense) => {
  return fetch(`/expenses/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ expense: expense }),
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchUpdateOneExpense = (username, expenseId, expense) => {
  return fetch(`/expenses/${username}/${expenseId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({expense: expense})
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchRemoveOneExpense = (username, expenseId) => {
  return fetch(`/expenses/${username}/${expenseId}`, {
    method: 'DELETE',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

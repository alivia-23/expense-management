const auth = {
  isPermitted: (username) => {

    if(!username || username.trim().length === 0) {
      return false;
    }
    if(username.toLowerCase() === 'dog') {
      return false;
    }
    return true;
  },
};

module.exports = auth;

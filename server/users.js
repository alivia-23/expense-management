const users = {};

const DEFAULT_PROFILE = {
  theme: 'light',
};

const getInfo = (username) => {
  if(!users[username]) {
    users[username] = { ...DEFAULT_PROFILE, username };
  }
  return users[username];
};

module.exports = {
  getInfo,
};

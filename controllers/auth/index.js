const { ctrlWrapper } = require('../../helpers');

const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const refreshUser = require('./refreshUser');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  refreshUser: ctrlWrapper(refreshUser),
};

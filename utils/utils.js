import LoginWindow from '../screens/loginWindow';
import CreateNewUser from '../screens/createNewUser';

export const ROUTES = {
  LoginWindow: {
    screen: LoginWindow,
  },
  CreateNewUser: {
    screen: CreateNewUser,
  },
};
export const HTTP = {
  login: 'http://10.100.102.45:5000/login',
  createNewUser: 'http://10.100.102.45:5000/createUser',
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
  accept: 'application/json',
  'Content-Type': 'application/json',
  loginProblemMessage: 'problem with the login',
  serverProblemMessage: 'problem with the server',
  connectProblemMessage: 'cannot connect to the server',
};

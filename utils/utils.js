import LoginWindow from '../screens/loginWindow';
import CreateNewUser from '../screens/createNewUser';
import {isValidNumber} from 'react-native-gesture-handler/lib/typescript/web/utils';

export const ROUTES = {
  LoginWindow: {
    screen: LoginWindow,
  },
  CreateNewUser: {
    screen: CreateNewUser,
  },
};
export const HTTP = {
  login: 'http://192.168.1.14:5000/login',
  createNewUser: 'http://192.168.1.14:5000/createUser',
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

export interface IBarber {
  barberName: string;
  location: string;
  exactLocation: {
    lat: number,
    lng: number,
  };
  grade: number;
  followers: number;
  picture: number;
  favorite: boolean;
  id: number;
  summary: {
    time: string,
    sentence: string,
    headline: string,
  };
}

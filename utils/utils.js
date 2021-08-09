import LoginWindow from '../screens/loginWindow';
import CreateNewUser from '../screens/createNewUser';
import {isValidNumber} from 'react-native-gesture-handler/lib/typescript/web/utils';
import {action, observable} from 'mobx';

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

export interface IAboutBarber {
  phoneNumber: string;
  openHour: any;
  closeHour: any;
  summary: {
    sentence: string,
    headline: string,
  };
  location: string;
}

export interface IHairStyle {
  name: string;
  id: number;
  price: number;
  time: number;
}

export interface IAppointment {
  date: IDate;
  time: string;
  type: string[];
  price: number;
  amountOfTime: number;
  gender: string;
  barberName: string;
  barberId: number;
}
export interface IDate {
  day: number;
  month: number;
  year: number;
}

export interface ITypes {
  type: string[];
  gender: string;
}

export interface IAppointmentViewStore {
  maleHairStyleList: IHairStyle[];
  femaleHairStyleList: IHairStyle[];
  selectedHairStyleList: IHairStyle[];
  amountOfTime: number;
  price: number;
  date: IDate;
  minDate: IDate;
  maxDate: IDate;
  appointment: IAppointment;
  futureAppointmentList: IAppointment[];
  pastAppointmentList: IAppointment[];
  typeOfHairAppointment: ITypes;
  timeList: string[];
  setAmountOfTime: any;
  setMaleHairStyleList: any;
  setFemaleHairStyleList: any;
  setSelectedHairStyleList: any;
  setPrice: any;
  setDate: any;
  setMaxAndMinDate: any;
  setAppointment: any;
  setTimeList: any;
  setTypeOfHairAppointment: any;
  setAppointmentList: any;
}

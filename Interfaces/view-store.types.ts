import {action, observable} from 'mobx';

export interface IBarberPageViewStore {
  userId: string;
  userName: string;
  barberId: string;
  barberName: string;
  barberLocation: string;
  setUserId: any;
  setUserName: any;
  setLogin: any;
  userEmail: string;
  userCity: string;
  userGender: string;
  barberList: any;
  setList: any;
  setBarberId: any;
  setBarberName: any;
  setBarberLocation: any;
}

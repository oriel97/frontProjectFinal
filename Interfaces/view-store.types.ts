import {action, observable} from 'mobx';

export interface IBarberPageViewStore {
  userId: string;
  userName: string;
  setUserId: any;
  setUserName: any;
  setLogin: any;
  userEmail: string;
  userCity: string;
  userGender: string;
}

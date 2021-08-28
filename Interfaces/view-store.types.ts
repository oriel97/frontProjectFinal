import type {IAboutBarber} from '../utils/utils';
import type {IBarber} from '../Interfaces/user';
import type {IImage} from '../utils/utils';
import {action, observable} from 'mobx';

export interface IBarberPageViewStore {
  barberId: string;
  barberName: string;
  barberLocation: string;
  barberInfo: IAboutBarber;
  barberList: any;
  setList: any;
  setBarberId: any;
  setBarberName: any;
  setBarberLocation: any;
  setBarberInfo: any;
  barber: IBarber;
  setBarber: any;
  setBarberImageList: any;
  barberImageList: IImage[];
}
export interface IUserStore {
  userGender: string;
  userEmail: string;
  userCity: string;
  userName: string;
  userId: string;
  userImages: [];
  setUserId: any;
  setUserName: any;
  setLogin: any;
}

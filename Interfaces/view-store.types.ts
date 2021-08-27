import type {IAboutBarber} from '../utils/utils';
import type {IBarber} from '../Interfaces/user';
import type {IImage} from '../utils/utils';

export interface IBarberPageViewStore {
  userId: string;
  userName: string;
  barberId: string;
  barberName: string;
  barberLocation: string;
  barberInfo: IAboutBarber;
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
  setBarberInfo: any;
  barber: IBarber;
  setBarber: any;
  setBarberImageList: any;
  barberImageList: IImage[];
}

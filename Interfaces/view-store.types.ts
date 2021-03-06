import type {IAboutBarber} from '../utils/utils';
import type {IBarber} from '../Interfaces/user';
import type {IImage, INotifications} from '../utils/utils';

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
  setFavorite: any;
}
export interface IUserStore {
  notifications: INotifications;
  userGender: string;
  userEmail: string;
  userCity: string;
  userName: string;
  userId: string;
  userImages: IImage[];
  setUserId: any;
  setUserName: any;
  setLogin: any;
  setUserImages: any;
  addImageToImageList: any;
  setNotifications: any;
  setNotificationSeen: any;
  unseenNotification: number;
  setNotificationPressed: any;
}

import {IVideosViewStore} from 'typescript/view-store.types';
import {action, makeObservable, observable} from 'mobx';
import type {IImage} from '../utils/utils';
import {IUserStore} from '../Interfaces/view-store.types';

const initialData = {
  userName: '',
  userId: '',
  userEmail: '',
  userCity: '',
  userGender: '',
  userImages: [],
};

class UserStore implements IUserStore {
  userName = initialData.userName;
  userId = initialData.userId;
  userEmail = initialData.userEmail;
  userCity = initialData.userCity;
  userGender = initialData.userGender;
  userImages = initialData.userImages;
  constructor() {
    makeObservable(this, {
      userGender: observable,
      userEmail: observable,
      userCity: observable,
      userName: observable,
      userId: observable,
      userImages: observable,
      setUserId: action.bound,
      setUserName: action.bound,
      setLogin: action.bound,
      setUserImages: action.bound,
      addImageToImageList: action.bound,
    });
  }
  addImageToImageList(image: IImage) {
    this.userImages.unshift(image);
  }
  setUserImages(userImages: IImage[]) {
    this.userImages = userImages;
  }
  setUserId(userId: string) {
    this.userId = userId;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }

  setLogin(
    userName: string,
    userId: string,
    userGender: string,
    userEmail: string,
    userCity: string,
  ) {
    this.userId = userId;
    this.userName = userName;
    this.userGender = userGender;
    this.userEmail = userEmail;
    this.userCity = userCity;
  }
}

export default UserStore;

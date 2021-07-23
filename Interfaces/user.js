export interface User {
  userName: string;
  password: string;
  location: string;
  dateOfBirth: string;
  email: string;
}

export interface userInfo {
  userName: string;
  location: string;
  email: string;
  gender: string;
}

export interface IBarber {
  barberName: string;
  location: string;
  grade: number;
  followers: number;
  picture: string;
  favorite: boolean;
  summary: {
    time: string,
    sentence: string,
    headline: string,
  };
}

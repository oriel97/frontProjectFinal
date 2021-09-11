import AsyncStorage from '@react-native-async-storage/async-storage';

const userInfoObject = 'userInformation';
let userInformation: any = null;

export const initFromLocalStorage = async () => {
  if (userInformation === null) {
    try {
      const userInfo = await AsyncStorage.getItem(userInfoObject);
      if (!userInfo) {
        userInformation = {};
      } else {
        userInformation = JSON.parse(userInfo);
      }
    } catch (error) {
      console.log('there is no user');
      userInformation = {};
    }
  }
  return userInformation;
};

export async function singedOut() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('cant delete all');
  }
}

export async function signedIn(userId: string, userName: string) {
  try {
    await initFromLocalStorage();
    const jsonValue = JSON.stringify({
      userId: userId,
      userName: userName,
    });
    await AsyncStorage.setItem(userInfoObject, jsonValue);
  } catch (error) {
    console.log(error);
  }
}

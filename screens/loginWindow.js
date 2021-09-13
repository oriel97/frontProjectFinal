import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FunctionComponent} from 'react';
import {Colors} from '../utils/color';
import Input from '../components/input';
import Api from '../api/apiRequests';
import {signedIn} from '../api/phoneStorage';
import {IUserStore} from '../Interfaces/view-store.types';

interface IProps {
  navigation: any;
  userStore?: IUserStore;
}

const LoginWindow: FunctionComponent<IProps> = ({navigation, userStore}) => {
  const navigateToCreateNewUserPage = () => {
    navigation.navigate('CreateNewUser');
  };
  const [isLoading, setIsLoading] = useState(false);
  const [loginProblem, setLoginProblem] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const nameInputHandler = enteredText => {
    setName(enteredText);
  };

  const passwordInputHandler = enteredText => {
    setPassword(enteredText);
  };

  const pressHandler = async () => {
    try {
      setLoginProblem(false);
      setName('');
      setPassword('');
      setIsLoading(true);
      const response = await Api.Login(name, password);
      const token = response.token;
      const userInfo = await Api.getUserInfo();
      await signedIn(token.toString(), name);
      userStore.setLogin(
        name,
        token.toString(),
        userInfo.gender,
        userInfo.email,
        userInfo.city,
      );
      setIsLoading(false);
      navigation.navigate('DrawerNav');
    } catch (error) {
      setIsLoading(false);
      setLoginProblem(true);
    }
  };

  return (
    <View style={{height: '100%', backgroundColor: Colors.lightGrey}}>
      <View style={{marginTop: 80}}>
        <Text style={styles.headline}>Get Cut!</Text>
        {loginProblem && (
          <View style={[styles.problem]}>
            <Text style={styles.problemText}>
              User name or Password are incorrect
            </Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <Input
            isPassword={false}
            onChangeText={nameInputHandler}
            value={name}
            placeHolder="User name"
          />
          <Input
            isPassword={true}
            placeHolder="Password"
            onChangeText={passwordInputHandler}
            value={password}
          />
          <View style={styles.button}>
            <TouchableOpacity onPress={pressHandler}>
              {!isLoading ? (
                <Text style={{color: Colors.white}}>Login</Text>
              ) : (
                <ActivityIndicator
                  color={Colors.white}
                  style={{justifyContent: 'center'}}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigateToCreateNewUserPage('CreateNewUser')}>
              <Text style={{color: Colors.white}}>Create new user</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headline: {
    textAlign: 'center',
    fontSize: 80,
    fontWeight: 'bold',
    color: Colors.middleBlue,
    marginBottom: 30,
  },
  inputContainer: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 12,
    backgroundColor: Colors.lightBlue,
    width: '40%',
    height: 35,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  problem: {
    bottom: 20,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  problemText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default inject('userStore')(observer(LoginWindow));

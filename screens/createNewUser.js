import React, {FunctionComponent, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import {Colors} from '../utils/color';
import Input from '../components/input';
import DatePicker from 'react-native-date-picker';
import Card from '../components/card';
import ChooseList from '../components/choose-list';
import Api from '../api/apiLogin';

interface IProps {
  navigation: any;
}

const CreateNewUser: FunctionComponent<IProps> = ({navigation}) => {
  const [backColor, setBackColor] = useState(Colors.lightGrey);
  const [openPopUp, setOpenPopUp] = useState(true);
  const [isCreated, setIsCreated] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newPasswordVerify, setNewPasswordVerify] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  // problem with fields
  const [userNameProblem, setUserNameProblem] = useState(false);
  const [passwordProblem, setPasswordProblem] = useState(false);
  const [verifyPasswordProblem, setVerifyPasswordProblem] = useState(false);
  const [emailProblem, setEmailProblem] = useState(false);
  const [genderProblem, setGenderProblem] = useState(false);
  const [LocationProblem, setLocationProblem] = useState(false);
  const [dateProblem, setDateProblem] = useState(false);
  const [nameOfTheCity, setNameOfTheCity] = useState(
    'Click to choose your city',
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleDateButton, setVisibleDateButton] = useState(false);
  const [dateFormed, setDateFormed] = useState('Click to choose your date');
  const [serverProblem, setServerProblem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameOfTheCityHandler = cityName => {
    setNameOfTheCity(cityName);
    setLocationProblem(false);
  };

  const opened = () => {
    setOpenPopUp(!openPopUp);
    if (openPopUp) {
      setBackColor('rgba(0,0,0,0.5)');
    } else {
      setBackColor(Colors.lightGrey);
    }
  };

  const newGenderHandler = genderType => {
    setGender(genderType);
    setGenderProblem(false);
  };

  const newEmailHandler = email => {
    setNewEmail(email);
    setEmailProblem(false);
  };

  const newUserNameHandler = name => {
    setNewUserName(name);
    setUserNameProblem(false);
  };
  const newPasswordHandler = password => {
    setNewPassword(password);
    setPasswordProblem(false);
  };
  const newPasswordVerifyHandler = password => {
    setNewPasswordVerify(password);
    setVerifyPasswordProblem(false);
  };

  const visibleDateButtonHandler = state => {
    if (openPopUp) {
      setBackColor('rgba(0,0,0,0.5)');
    } else {
      setBackColor(Colors.lightGrey);
    }
    setOpenPopUp(!openPopUp);
    setVisibleDateButton(!visibleDateButton);
    if (!state) {
      setDate(new Date());
      setDateFormed('Click to choose your date');
    } else {
      setDateFormed(date.toDateString());
      setDateProblem(false);
    }
  };
  const submitSuccesses = () => {
    setIsCreated(false);
    navigation.pop();
  };

  const submitHandler = async () => {
    let submit = 0;
    if (newUserName.length < 6) {
      setUserNameProblem(true);
      setNewUserName('');
      submit = 1;
    }
    if (newPassword.length < 8) {
      setPasswordProblem(true);
      setNewPassword('');
      submit = 1;
    }
    if (newPassword !== newPasswordVerify) {
      setVerifyPasswordProblem(true);
      setNewPasswordVerify('');
      submit = 1;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(newEmail) === false) {
      setEmailProblem(true);
      setNewEmail('');
      submit = 1;
    }
    if (nameOfTheCity === '') {
      setLocationProblem(true);
      setNameOfTheCity('');
      submit = 1;
    }
    if (gender === '') {
      setGenderProblem(true);
      submit = 1;
    }
    const year = date.getFullYear();
    if (year > 2015) {
      setDateProblem(true);
      setDate(new Date());
      setDateFormed('Click to choose your date');
      submit = 1;
    }
    if (nameOfTheCity === 'Click to choose your city') {
      setLocationProblem(true);
    }
    if (submit === 0) {
      try {
        setServerProblem(false);
        setIsLoading(true);
        const body = JSON.stringify({
          userName: newUserName,
          password: newPassword,
          location: nameOfTheCity,
          gender: gender,
          email: newEmail,
          dateOfBirth: date,
        });
        const response = await Api.createNewUser(body);
        setIsLoading(false);
        if (response.message === 'New user created!') {
          setIsCreated(true);
        }
      } catch (error) {
        setIsLoading(false);
        setServerProblem(true);
      }
    }
  };
  const opend = () => {
    setOpenPopUp(!openPopUp);
  };

  const handleScroll = event => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  const positionHandler = () => {
    const pos = (scrollPosition + Dimensions.get('screen').width) / 2 + 70;
    return pos;
  };

  const DateCard = () => {
    return (
      <View
        onLayout={positionHandler}
        style={[
          styles.cardContainer,
          {top: positionHandler(), zIndex: 9999999},
        ]}>
        <Card>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
            format="YYYY-MM-DD"
          />
          <View style={styles.dateButtons}>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => visibleDateButtonHandler(true)}>
                <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => visibleDateButtonHandler(false)}>
                <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <ScrollView
      scrollEnabled={!!openPopUp}
      onScroll={handleScroll}
      nestedScrollEnabled={true}
      style={{
        height: '100%',
        backgroundColor: backColor,
      }}>
      {!openPopUp && <View style={styles.disabled} />}
      <View>
        <Text style={styles.welcome}>welcome!</Text>
        <Text style={styles.newUserText}>lets create new user!</Text>
      </View>
      {userNameProblem && (
        <View style={styles.problem}>
          <Text style={styles.problemText}>needed at list 6 characters !</Text>
        </View>
      )}
      <View style={[styles.inputContainer, {marginTop: 50}]}>
        <Text style={styles.textContainer}>User name:</Text>
        <Input
          stylesProp={{width: '60%'}}
          isPassword={false}
          placeHolder={'new user name'}
          onChangeText={newUserNameHandler}
          value={newUserName}
        />
      </View>
      {passwordProblem && (
        <View style={[styles.problem, {top: 270}]}>
          <Text style={styles.problemText}>needed at list 8 characters !</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.textContainer}>Password:</Text>
        <Input
          stylesProp={{width: '60%'}}
          isPassword={true}
          placeHolder={'password'}
          onChangeText={newPasswordHandler}
          value={newPassword}
        />
      </View>
      {verifyPasswordProblem && (
        <View style={[styles.problem, {top: 370}]}>
          <Text style={styles.problemText}>passwords are not the same !</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.textContainer}>Verify password:</Text>
        <Input
          stylesProp={{width: '60%'}}
          isPassword={true}
          placeHolder={'password'}
          onChangeText={newPasswordVerifyHandler}
          value={newPasswordVerify}
        />
      </View>
      {emailProblem && (
        <View style={[styles.problem, {top: 465}]}>
          <Text style={styles.problemText}>wrong email address !</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.textContainer}>Email address:</Text>
        <Input
          stylesProp={{width: '60%'}}
          isPassword={false}
          placeHolder={'email'}
          onChangeText={newEmailHandler}
          value={newEmail}
        />
      </View>
      {genderProblem && (
        <View style={[styles.problem, {top: 565, left: 65}]}>
          <Text style={styles.problemText}>gender type missed !</Text>
        </View>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.button,
            gender === 'Male'
              ? {backgroundColor: 'red'}
              : {backgroundColor: Colors.lightBlue},
            {marginRight: 20},
          ]}
          onPress={() => newGenderHandler('Male')}>
          <Text style={{color: Colors.white, fontWeight: 'bold'}}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            gender === 'Female'
              ? {backgroundColor: 'red'}
              : {backgroundColor: Colors.lightBlue},
          ]}
          onPress={() => newGenderHandler('Female')}>
          <View>
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>
              Female
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {dateProblem && (
        <View style={[styles.problem, {top: 640}]}>
          <Text style={styles.problemText}>date of birth is missing !</Text>
        </View>
      )}
      <View style={styles.dateButtonContainer}>
        <Text style={styles.textContainer}>Date of birth:</Text>
        <TouchableOpacity
          style={[styles.button, {width: '60%'}]}
          onPress={() => visibleDateButtonHandler(true)}>
          <Text style={{color: Colors.white, fontWeight: 'bold'}}>
            {dateFormed}
          </Text>
        </TouchableOpacity>
      </View>
      {visibleDateButton ? <DateCard /> : null}
      {LocationProblem && (
        <View style={[styles.problem, {top: 715}]}>
          <Text style={styles.problemText}>location is missing !</Text>
        </View>
      )}
      <View style={{paddingTop: 10}} />
      <ChooseList
        cityName={nameOfTheCity}
        pressOnCity={nameOfTheCityHandler}
        disableScroll={opened}
      />
      {serverProblem && (
        <View style={[styles.problem, {top: 785, left: 70}]}>
          <Text style={styles.problemText}>can't submit - try again later</Text>
        </View>
      )}
      <View style={{alignItems: 'center', paddingTop: 30}}>
        <TouchableOpacity
          onPress={submitHandler}
          style={[styles.button, {width: 200, height: 80}]}>
          {!isLoading ? (
            <Text
              style={{color: Colors.white, fontWeight: 'bold', fontSize: 40}}>
              Submit!
            </Text>
          ) : (
            <ActivityIndicator
              color={Colors.white}
              size={'large'}
              style={{justifyContent: 'center'}}
            />
          )}
        </TouchableOpacity>
      </View>
      {isCreated && (
        <View style={{position: 'absolute', top: 450, right: 30}}>
          <Card style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: Colors.lightBlue,
                fontWeight: 'bold',
                fontSize: 40,
                textAlign: 'center',
              }}>
              Great !
            </Text>
            <Text
              style={{
                color: Colors.lightBlue,
                fontWeight: 'bold',
                fontSize: 40,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              you created new user!
            </Text>
            <TouchableOpacity
              style={[styles.button, {width: '60%'}]}
              onPress={submitSuccesses}>
              <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                Go back to home page
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      )}
      <View style={{paddingBottom: 30}} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  problemText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newUserText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 40,
    textAlign: 'center',
    color: Colors.middleBlue,
  },
  welcome: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 80,
    textAlign: 'center',
    color: Colors.middleBlue,
  },
  inputContainer: {
    marginBottom: 35,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    margin: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 12,
    backgroundColor: Colors.lightBlue,
    width: 100,
    height: 35,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  dateButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 30,
    marginTop: 30,
  },
  problem: {
    position: 'absolute',
    top: 175,
    left: 125,
    width: 280,
    height: 30,
    alignItems: 'center',
  },
  disabled: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 99998,
    width: '100%',
    height: '100%',
  },
});
export default CreateNewUser;

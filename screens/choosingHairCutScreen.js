import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';

import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';
import map from 'lodash/map';
import MultiSelect from 'react-native-multiple-select';
import Api from '../api/apiRequests';
import type {IAppointmentViewStore, IHairStyle} from '../utils/utils';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  appointmentViewStore?: IAppointmentViewStore;
  navigation: any;
}
const ChoosingHairCutScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
  appointmentViewStore,
}) => {
  const [selectedGender, setSelectedGender] = useState('Pick gender');
  const [selectedSingle, setSelectedSingle] = useState([]);
  const [selectedHairStyle, setSelectedHairStyle] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      appointmentViewStore.setSelectedHairStyleList([]);
      setSelectedHairStyle([]);
      setSelectedSingle([]);
      setSelectedGender('Pick gender');
      appointmentViewStore.setPrice(0);
      appointmentViewStore.setAmountOfTime(0);
      const starter = async () => {
        const hairStyleMaleAndFemaleList = await Api.getBarberHairStyleList(
          barberPageViewStores.barberId,
        );
        appointmentViewStore.setMaleHairStyleList(
          hairStyleMaleAndFemaleList.male,
        );
        appointmentViewStore.setFemaleHairStyleList(
          hairStyleMaleAndFemaleList.female,
        );
      };
      starter().catch(e => {
        console.log(e);
      });
    });
  });
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };
  const gender = [
    {id: 1, name: 'male'},
    {id: 2, name: 'female'},
  ];

  const onSelectedGender = selectedItem => {
    setSelectedSingle(selectedItem);
    setSelectedHairStyle([]);
    appointmentViewStore.setPrice(0);
    appointmentViewStore.setAmountOfTime(0);
    appointmentViewStore.setSelectedHairStyleList([]);
  };
  const onSelectedHairStyle = selectedItems => {
    setSelectedHairStyle(selectedItems);
    let list = [];
    for (let i = 0; i < selectedItems?.length; i++) {
      if (selectedGender === 'male') {
        list.push(appointmentViewStore.maleHairStyleList[selectedItems[i] - 1]);
      } else {
        list.push(
          appointmentViewStore.femaleHairStyleList[selectedItems[i] - 1],
        );
      }
    }
    appointmentViewStore.setSelectedHairStyleList(list);
  };

  const calculateTime = () => {
    let time1 = 0;
    for (
      let i = 0;
      i < appointmentViewStore.selectedHairStyleList.length;
      i++
    ) {
      time1 = time1 + appointmentViewStore.selectedHairStyleList[i].time;
    }

    let hours = parseInt(time1 / 60);
    let minuets = time1 % 60;
    if (minuets < 10) {
      minuets = '0' + minuets;
    }
    if (time1 === 0) {
      return null;
    }
    appointmentViewStore.setAmountOfTime(time1);
    return (
      ' ' + '0' + hours + ':' + minuets + '                (hours:minuets)'
    );
  };

  const calculatePrice = () => {
    let price1 = 0;
    for (
      let i = 0;
      i < appointmentViewStore.selectedHairStyleList.length;
      i++
    ) {
      price1 = price1 + appointmentViewStore.selectedHairStyleList[i].price;
    }

    if (price1 === 0) {
      return null;
    }
    appointmentViewStore.setPrice(price1);

    return ' ' + price1 + ' shekel';
  };

  const onPressOnMakeTheAppointmentButton = () => {
    if (appointmentViewStore.price !== 0 && appointmentViewStore !== 0) {
      appointmentViewStore.setTypeOfHairAppointment({
        type: appointmentViewStore.selectedHairStyleList,
        selectedGender,
      });
      navigation.navigate('ChooseAppointmentScreen');
    }
  };
  return (
    <View style={{height: '100%'}}>
      <Header headerName={'Appointment screen'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <View>
        <Text style={styles.categoryText}>
          {'Choose for which\n gender is the Appointment:'}
        </Text>
        <View style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardTextHeader}>treatments: </Text>
            <ScrollView horizontal={true}>
              <Text style={styles.cardTextHeader}>
                {map(
                  appointmentViewStore.selectedHairStyleList,
                  (item: IHairStyle, index) => {
                    return index !==
                      appointmentViewStore.selectedHairStyleList.length - 1
                      ? item.name + ', '
                      : item.name;
                  },
                )}
              </Text>
            </ScrollView>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardTextHeader}>time:</Text>
            <Text style={styles.cardTextHeader}>{calculateTime()}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardTextHeader}>price:</Text>
            <Text style={styles.cardTextHeader}>{calculatePrice()}</Text>
          </View>
        </View>
        <Text style={[styles.categoryText, {marginTop: 120}]}>
          Choose the type of the Appointment:
        </Text>
        <View style={styles.multiSelect}>
          <MultiSelect
            hideTags
            items={gender}
            uniqueKey="id"
            onSelectedItemsChange={items => {
              onSelectedGender(items);
              setSelectedGender(gender[items[0] - 1].name);
            }}
            selectedItems={selectedSingle}
            selectText={selectedGender}
            styleTextDropdown={styles.multiSelectText}
            styleTextDropdownSelected={styles.multiSelectText}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor={Colors.lightBlue}
            selectedItemIconColor={Colors.lightBlue}
            itemTextColor="#000"
            displayKey="name"
            styleSelectorContainer={{width: 300}}
            styleMainWrapper={{width: 300}}
            single={true}
            styleDropdownMenuSubsection={{height: 50}}
          />
        </View>
        <View style={styles.multiSelect2}>
          <MultiSelect
            hideTags
            items={
              selectedGender === 'male'
                ? appointmentViewStore.maleHairStyleList
                : selectedGender === 'female'
                ? appointmentViewStore.femaleHairStyleList
                : []
            }
            uniqueKey="id"
            onSelectedItemsChange={items => {
              onSelectedHairStyle(items);
            }}
            selectedItems={selectedHairStyle}
            selectText={'appointment type:'}
            styleTextDropdown={styles.multiSelectText}
            styleTextDropdownSelected={styles.multiSelectText}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor={Colors.lightBlue}
            selectedItemIconColor={Colors.lightBlue}
            itemTextColor="#000"
            displayKey="name"
            styleSelectorContainer={{width: 300}}
            styleMainWrapper={{width: 300}}
            styleDropdownMenuSubsection={{height: 50}}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPressOnMakeTheAppointmentButton}
            style={styles.button}>
            <Text style={styles.buttonText}>Make the appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardTextHeader: {fontWeight: 'bold', fontSize: 20, marginBottom: 20},
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 8,
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 320,
    height: 180,
    width: 350,
    left: 30,
  },
  multiSelect2: {
    position: 'absolute',
    top: 250,
    left: 55,
    elevation: 9,
  },
  categoryText: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.darkBlue,
    textAlign: 'center',
  },
  multiSelectText: {
    fontWeight: 'bold',
    marginLeft: 16,
    fontSize: 20,
  },
  multiSelect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  backIcon: {position: 'absolute', right: 20, top: 20},
  button: {
    width: 380,
    height: 50,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: Colors.white,
  },
  buttonContainer: {justifyContent: 'center', alignItems: 'center', top: 310},
});
export default inject(
  'barberPageViewStores',
  'appointmentViewStore',
)(observer(ChoosingHairCutScreen));

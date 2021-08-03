import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';

import {
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
  useEffect(() => {
    return navigation.addListener('focus', () => {
      appointmentViewStore.setSelectedHairStyleList([]);
      const starter = async () => {
        console.log(barberPageViewStores.barberId);
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
  const [selectedGender, setSelectedGender] = useState('Pick gender');
  const [selectedHairStyle, setSelectedHairStyle] = useState([]);

  const onSelectedGender = selectedItem => {
    setSelectedGender(selectedItem);
    setSelectedHairStyle([]);
    appointmentViewStore.setSelectedHairStyleList([]);
  };
  const onSelectedHairStyle = selectedItems => {
    setSelectedHairStyle(selectedItems);
    let list = [];
    for (let i = 0; i < selectedItems?.length; i++) {
      console.log(i);
      if (selectedGender === 'male') {
        list.push(appointmentViewStore.maleHairStyleList[selectedItems[i] - 1]);
      } else {
        list.push(
          appointmentViewStore.femaleHairStyleList[selectedItems[i] - 1],
        );
      }
    }
    appointmentViewStore.setSelectedHairStyleList(list);
    console.log(appointmentViewStore.selectedHairStyleList);
  };

  const calculateTime = () => {
    let time = 0;
    for (
      let i = 0;
      i < appointmentViewStore.selectedHairStyleList.length;
      i++
    ) {
      time = time + appointmentViewStore.selectedHairStyleList[i].time;
    }
    let hours = parseInt(time / 60);
    let minuets = time % 60;
    if (minuets < 10) {
      minuets = '0' + minuets;
    }
    if (time === 0) {
      return null;
    }
    return (
      ' ' + '0' + hours + ':' + minuets + '                (hours:minuets)'
    );
  };

  const calculatePrice = () => {
    let price = 0;
    for (
      let i = 0;
      i < appointmentViewStore.selectedHairStyleList.length;
      i++
    ) {
      price = price + appointmentViewStore.selectedHairStyleList[i].price;
    }

    if (price === 0) {
      return null;
    }
    return ' ' + price + ' shekel';
  };

  return (
    <View style={{height: '100%'}}>
      <Header
        headerName={'About ' + barberPageViewStores.barberName}
        openDrawerFunc={openDrawer}
      />
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
                    console.log(index);
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
            selectedItems={selectedGender}
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
          <TouchableOpacity style={styles.button}>
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

import React, {FunctionComponent} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalContainer from '../modalContainer';
import {Colors} from '../../utils/color';
import {inject, observer} from 'mobx-react';
import {IBarberPageViewStore} from '../../Interfaces/view-store.types';

interface IProps {
  sortOption: any;
  openOption: boolean;
  barberPageViewStores: IBarberPageViewStore;
}

const OptionsModal: FunctionComponent<IProps> = ({
  sortOption,
  openOption,
  barberPageViewStores,
}) => {
  const onPressOnSortABC = () => {
    let list = barberPageViewStores.barberList;
    list.sort((a, b) =>
      a.barberName.toUpperCase() > b.barberName.toUpperCase() ? 1 : -1,
    );
    barberPageViewStores.setList(list);
    sortOption();
  };
  const onPressOnSortGrade = () => {
    let list = barberPageViewStores.barberList;
    list.sort((a, b) => {
      if (a.grade === b.grade) {
        return a.barberName.toUpperCase() > b.barberName.toUpperCase() ? 1 : -1;
      }
      return a.grade < b.grade;
    });

    barberPageViewStores.setList(list);
    sortOption();
  };
  const onPressOnSortFollowers = () => {
    let list = barberPageViewStores.barberList;
    list.sort((a, b) => {
      if (a.followers === b.followers) {
        return a.barberName.toUpperCase() > b.barberName.toUpperCase() ? 1 : -1;
      }
      return a.followers < b.followers;
    });
    barberPageViewStores.setList(list);
    sortOption();
  };

  return (
    <View>
      {openOption && (
        <ModalContainer showFunc={sortOption} headLine={'Sort options'}>
          <View style={styles.options}>
            <View style={styles.optionBox}>
              <Text style={{fontWeight: 'bold'}}>Followers</Text>
              <TouchableOpacity onPress={onPressOnSortFollowers}>
                <Icon name="user-friends" color={Colors.black} size={75} />
              </TouchableOpacity>
            </View>
            <View style={styles.optionBox}>
              <Text style={{fontWeight: 'bold'}}>Grade</Text>
              <TouchableOpacity onPress={onPressOnSortGrade}>
                <Icon name="chart-line" color={Colors.black} size={75} />
              </TouchableOpacity>
            </View>
            <View style={styles.optionBox}>
              <Text style={{fontWeight: 'bold'}}>ABC</Text>
              <TouchableOpacity onPress={onPressOnSortABC}>
                <Icon name="sort-alpha-up" color={Colors.black} size={75} />
              </TouchableOpacity>
            </View>
          </View>
        </ModalContainer>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  optionBox: {
    width: 110,
    borderWidth: 2,
    borderColor: 'black',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
export default inject('barberPageViewStores')(observer(OptionsModal));

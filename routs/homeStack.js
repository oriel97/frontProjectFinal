import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import {ROUTES} from '../utils/utils';

const HomeStack = createStackNavigator(ROUTES);

export default createAppContainer(HomeStack);

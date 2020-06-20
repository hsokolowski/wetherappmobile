import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from '../components/Hello';
import DetailsScreen from '../components/Details';
import ListScreen from '../components/List';
import SettingsScreen from '../components/Settings';
import ForecastScreen from '../components/Forecast';

const Stack = createStackNavigator({
  Hello: {screen: HomeScreen},
  Details: {screen: DetailsScreen},
  List: {screen: ListScreen},
  Settings: {screen: SettingsScreen},
  Forecast: {screen: ForecastScreen},
});

export default createAppContainer(Stack);

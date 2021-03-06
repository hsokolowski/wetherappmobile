import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from '../components/Hello';
import DetailsScreen from '../components/Details';
import DetailsSingleScreen from '../components/DetailsForSingle';
import DetailsWatchScreen from '../components/DetailsWatch';
import ListScreen from '../components/List';
import SettingsScreen from '../components/Settings';
import ForecastScreen from '../components/Forecast';
import CheckScreen from '../components/Check';

const Stack = createStackNavigator({
  Hello: {screen: HomeScreen},
  Details: {screen: DetailsScreen},
  Current: {screen: DetailsSingleScreen},
  Watch: {screen: DetailsWatchScreen},
  Watchlist: {screen: ListScreen},
  Settings: {screen: SettingsScreen},
  Forecast: {screen: ForecastScreen},
  Check: {screen: CheckScreen},
});

export default createAppContainer(Stack);

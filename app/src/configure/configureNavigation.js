import {createSwitchNavigator, createStackNavigator} from 'react-navigation';
import {configureNavigation} from 'truefit-navigation';

// import route names
import {LOGIN, WIZARD, DATA1, DATA2, RESULTS} from '../routes';

// import components
import {Login} from '../features/users/components';
import {Data1, Data2, Results} from '../features/data/components';

// create routeConfiguration
const dataWizard = createStackNavigator(
  {
    [DATA1]: Data1,
    [DATA2]: Data2,
    [RESULTS]: Results,
  },
  {
    headerMode: 'none',
  },
);

export const routeConfig = {
  [LOGIN]: {screen: Login},
  [WIZARD]: dataWizard,
};

// create navigator config
export const navigatorConfig = {};

// config
export default () => {
  configureNavigation(
    createSwitchNavigator,
    routeConfig,
    navigatorConfig,
    LOGIN,
  );
};

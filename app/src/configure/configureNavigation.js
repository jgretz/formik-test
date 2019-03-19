import {createSwitchNavigator} from 'react-navigation';
import {configureNavigation} from 'truefit-navigation';

// import route names
import {FORM} from '../routes';

// import components
import {Form} from '../features/shared/components';

// create routeConfiguration
export const routeConfig = {
  [FORM]: {screen: Form},
};

// create navigator config
export const navigatorConfig = {};

// config
export default () => {
  configureNavigation(
    createSwitchNavigator,
    routeConfig,
    navigatorConfig,
    FORM,
  );
};

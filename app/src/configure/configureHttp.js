import {configureHttp as httpConfigure} from 'truefit-react-utils';

const DEFAULT_CONFIG = {
  baseURL: 'http://api.forismatic.com/api/1.0/',
};

// The inner function is where you add the logic to pass up credentials
export default store => httpConfigure(() => DEFAULT_CONFIG); // eslint-disable-line

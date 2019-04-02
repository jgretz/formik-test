// this pattern is stolen from react-material - i didnt want to weigh down this example with a UI framework, but I also didnt want to bloat it with a ton
// of duplicate styles
import React from 'react';
import {styles} from '../styles';

export default (componentStyles = {}) => Component => props => {
  const resolved = {
    ...styles,
    ...componentStyles,
  };

  return <Component styles={resolved} {...props} />;
};

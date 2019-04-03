import React from 'react';
import {Text} from 'react-native';

const hasError = (name, errors, touched, isSubmitting) =>
  errors[name] && (touched[name] || isSubmitting);

export default ({name, errors, touched, isSubmitting, styles}) => {
  const text = hasError(name, errors, touched, isSubmitting)
    ? `*${errors[name]}*`
    : '';

  return <Text style={styles.error}>{text}</Text>;
};

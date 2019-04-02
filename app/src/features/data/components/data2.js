import React from 'react';
import {connect} from 'react-redux';
import {pipe, withHandlers, withState} from '@synvox/rehook';

import {Button, Text, View} from 'react-native';
import {Input} from '../../shared/components';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {goToResults} from '../actions';
import {withStyles} from '../../shared/services';

// Schema
const SCHEMA = {
  favMoview: 'favMovie',
  favFood: 'favFood',
};

const Data2Schema = Yup.object().shape({
  favMovie: Yup.string().required('Favorite Movie Required'),
  favFood: Yup.string().required('Favorite Food Required'),
});

// render
const Errors = ({errors, touched, styles}) => {
  const errorText = [
    {
      touched: touched?.favMovie,
      text: errors.favMovie,
    },
    {
      touched: touched?.favFood,
      text: errors.favFood,
    },
  ]
    .filter(x => x.touched && x.text)
    .map(x => x.text)
    .join('\n');

  return <Text styles={styles.errors}>{errorText}</Text>;
};

const Fields = ({focused, handleFocus, setNextFocus, styles}) => ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,

  ...props
}) => (
  <View style={styles.view}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Favorite Movie</Text>
    </View>
    <Input
      style={styles.input}
      value={values.favMovie}
      returnKeyLabel="Next"
      returnKeyType="next"
      onChangeText={handleChange(SCHEMA.favMoview)}
      onBlur={handleBlur(SCHEMA.favMoview)}
      onFocus={handleFocus}
      onEndEditing={setNextFocus(SCHEMA.favFood)}
      focus={focused === SCHEMA.favMoview}
      autoFocus
    />
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Favorite Food</Text>
    </View>
    <Input
      style={styles.input}
      value={values.favFood}
      returnKeyLabel="Submit"
      returnKeyType="done"
      onChangeText={handleChange(SCHEMA.favFood)}
      onBlur={handleBlur(SCHEMA.favFood)}
      onFocus={handleFocus}
      onEndEditing={handleSubmit}
      focus={focused === SCHEMA.favFood}
    />
    <Button onPress={handleSubmit} title="Complete" />
    <Errors styles={styles} {...props} />
  </View>
);

const Data2 = ({handlSubmit, ...props}) => (
  <Formik validationSchema={Data2Schema} onSubmit={handlSubmit}>
    {Fields(props)}
  </Formik>
);

// compose
const ComposedData2 = pipe(
  withState('focused', 'setFocus', SCHEMA.favMoview),

  withHandlers({
    handlSubmit: ({goToResults}) => values => {
      goToResults(values);
    },

    handleFocus: ({setFocus}) => () => {
      setFocus(null);
    },

    setNextFocus: ({setFocus}) => nextFocus => () => {
      setFocus(nextFocus);
    },
  }),

  Data2,
);

// export
export default connect(
  null,
  {goToResults},
)(withStyles()(ComposedData2));

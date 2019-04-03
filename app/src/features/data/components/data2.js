import React from 'react';
import {connect} from 'react-redux';
import {pipe, withHandlers, withState} from '@synvox/rehook';

import {Button, Text, View} from 'react-native';
import {Input, ErrorMessage} from '../../shared/components';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {goToResults} from '../actions';
import {withStyles} from '../../shared/services';

// Schema
const SCHEMA = {
  favMovie: 'favMovie',
  favFood: 'favFood',
};

const Data2Schema = Yup.object().shape({
  favMovie: Yup.string().required('Favorite Movie Required'),
  favFood: Yup.string().required('Favorite Food Required'),
});

// render
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
      <ErrorMessage name={SCHEMA.favMovie} styles={styles} {...props} />
    </View>
    <Input
      style={styles.input}
      value={values.favMovie}
      returnKeyLabel="Next"
      returnKeyType="next"
      onChangeText={handleChange(SCHEMA.favMovie)}
      onBlur={handleBlur(SCHEMA.favMovie)}
      onFocus={handleFocus}
      onEndEditing={setNextFocus(SCHEMA.favFood)}
      focus={focused === SCHEMA.favMovie}
      autoFocus
    />
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Favorite Food</Text>
      <ErrorMessage name={SCHEMA.favFood} styles={styles} {...props} />
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
  </View>
);

const Data2 = ({handlSubmit, ...props}) => (
  <Formik validationSchema={Data2Schema} onSubmit={handlSubmit}>
    {Fields(props)}
  </Formik>
);

// compose
const ComposedData2 = pipe(
  withState('focused', 'setFocus', SCHEMA.favMovie),

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

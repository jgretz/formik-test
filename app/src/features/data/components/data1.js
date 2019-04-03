import React from 'react';
import {connect} from 'react-redux';
import {pipe, withHandlers, withState} from '@synvox/rehook';

import {Button, Text, View} from 'react-native';
import {Input, ErrorMessage} from '../../shared/components';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {goToData2} from '../actions';
import {withStyles} from '../../shared/services';

// Schema
const SCHEMA = {
  firstName: 'firstName',
  lastName: 'lastName',
};

const Data1Schema = Yup.object().shape({
  firstName: Yup.string().required('First Name Required'),
  lastName: Yup.string().required('Last Name Required'),
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
      <Text style={styles.label}>First Name</Text>
      <ErrorMessage name={SCHEMA.firstName} styles={styles} {...props} />
    </View>
    <Input
      style={styles.input}
      value={values.firstName}
      returnKeyLabel="Next"
      returnKeyType="next"
      onChangeText={handleChange(SCHEMA.firstName)}
      onBlur={handleBlur(SCHEMA.firstName)}
      onFocus={handleFocus}
      onEndEditing={setNextFocus(SCHEMA.lastName)}
      focus={focused === SCHEMA.firstName}
      autoFocus
    />
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Last Name</Text>
      <ErrorMessage name={SCHEMA.lastName} styles={styles} {...props} />
    </View>
    <Input
      style={styles.input}
      value={values.lastName}
      returnKeyLabel="Submit"
      returnKeyType="done"
      onChangeText={handleChange(SCHEMA.lastName)}
      onBlur={handleBlur(SCHEMA.lastName)}
      onFocus={handleFocus}
      onEndEditing={handleSubmit}
      focus={focused === SCHEMA.lastName}
    />
    <Button onPress={handleSubmit} title="Next" />
  </View>
);

const Data1 = ({handlSubmit, ...props}) => (
  <Formik validationSchema={Data1Schema} onSubmit={handlSubmit}>
    {Fields(props)}
  </Formik>
);

// compose
const ComposedData1 = pipe(
  withState('focused', 'setFocus', SCHEMA.firstName),

  withHandlers({
    handlSubmit: ({goToData2}) => values => {
      goToData2(values);
    },

    handleFocus: ({setFocus}) => () => {
      setFocus(null);
    },

    setNextFocus: ({setFocus}) => nextFocus => () => {
      setFocus(nextFocus);
    },
  }),

  Data1,
);

// export
export default connect(
  null,
  {goToData2},
)(withStyles()(ComposedData1));

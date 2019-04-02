import React from 'react';
import {connect} from 'react-redux';
import {pipe, withHandlers, withState} from '@synvox/rehook';

import {Button, Text, View} from 'react-native';
import {Input} from '../../shared/components';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {goToData2} from '../actions';

// styles
const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    width: 200,
    marginBottom: 10,

    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,

    padding: 5,
  },
  labelContainer: {
    width: 200,
    alignItems: 'flex-start',
  },
  label: {},
  errors: {
    height: 50,
    width: 200,

    color: '#ff0000',
  },
};

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
const Errors = ({errors, touched}) => {
  const errorText = [
    {
      touched: touched?.firstName,
      text: errors.firstName,
    },
    {
      touched: touched?.lastName,
      text: errors.lastName,
    },
  ]
    .filter(x => x.touched && x.text)
    .map(x => x.text)
    .join('\n');

  return <Text styles={styles.errors}>{errorText}</Text>;
};

const Fields = ({focused, handleFocus, setNextFocus}) => ({
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <View style={styles.view}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>First Name</Text>
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
    <Errors errors={errors} touched={touched} />
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
)(ComposedData1);

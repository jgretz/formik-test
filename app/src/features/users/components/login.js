import React from 'react';
import {connect} from 'react-redux';
import {pipe, withHandlers, withState} from '@synvox/rehook';

import {Button, Text, View} from 'react-native';
import {Input} from '../../shared/components';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {login} from '../actions';

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
  errors: {
    height: 50,
    width: 200,

    color: '#ff0000',
  },
};

// Schema
const SCHEMA = {
  email: 'email',
  password: 'password',
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email Required'),

  password: Yup.string().required('Password Required'),
});

// render
const Errors = ({errors, touched}) => {
  const errorText = [
    {
      touched: touched?.email,
      text: errors.email,
    },
    {
      touched: touched?.password,
      text: errors.password,
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
    <Input
      style={styles.input}
      autoCapitalize="none"
      textContentType="emailAddress"
      value={values.email}
      returnKeyLabel="Next"
      returnKeyType="next"
      onChangeText={handleChange(SCHEMA.email)}
      onBlur={handleBlur(SCHEMA.email)}
      onFocus={handleFocus}
      onEndEditing={setNextFocus(SCHEMA.password)}
      focus={focused === SCHEMA.email}
      autoFocus
    />
    <Input
      style={styles.input}
      textContentType="password"
      value={values.password}
      secureTextEntry
      returnKeyLabel="Submit"
      returnKeyType="done"
      onChangeText={handleChange(SCHEMA.password)}
      onBlur={handleBlur(SCHEMA.password)}
      onFocus={handleFocus}
      onEndEditing={handleSubmit}
      focus={focused === SCHEMA.password}
    />
    <Button onPress={handleSubmit} title="Login" />
    <Errors errors={errors} touched={touched} />
  </View>
);

const Login = ({handlSubmit, ...props}) => (
  <Formik validationSchema={LoginSchema} onSubmit={handlSubmit}>
    {Fields(props)}
  </Formik>
);

// compose
const ComposedLogin = pipe(
  withState('focused', 'setFocus', SCHEMA.email),

  withHandlers({
    handlSubmit: ({login}) => values => {
      login(values.email, values.password);
    },

    handleFocus: ({setFocus}) => () => {
      setFocus(null);
    },

    setNextFocus: ({setFocus}) => nextFocus => () => {
      setFocus(nextFocus);
    },
  }),

  Login,
);

// export
export default connect(
  null,
  {login},
)(ComposedLogin);

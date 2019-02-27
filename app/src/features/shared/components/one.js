import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

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

const INITIAL = {email: 'test@test.com'};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const onSubmit = values => {
  alert(`Hey, you can type an email!!!!\n\n${values.email}`);
};

const Errors = ({errors}) => {
  if (!errors) {
    return <Text />;
  }

  return <Text styles={styles.errors}>{errors.email}</Text>;
};

const Login = ({errors, values, handleChange, handleBlur, handleSubmit}) => (
  <View style={styles.view}>
    <TextInput
      style={styles.input}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      value={values.email}
    />
    <Button onPress={handleSubmit} title="Submit" />
    <Errors errors={errors} />
  </View>
);

export default () => (
  <Formik
    initialValues={INITIAL}
    validationSchema={LoginSchema}
    onSubmit={onSubmit}
  >
    {Login}
  </Formik>
);

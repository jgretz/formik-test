import React from 'react';
import {connect} from 'react-redux';
import {pipe, withHandlers} from '@synvox/rehook';

import {Button, Text, View} from 'react-native';

import {reset} from '../actions';
import {dataSelector} from '../selectors';
import {withStyles} from '../../shared/services';

// render
const Results = ({
  data: {email, firstName, lastName, favMovie, favFood},
  reset,
  styles,
}) => (
  <View style={styles.view}>
    <Text>Email: {email}</Text>
    <Text>First Name: {firstName}</Text>
    <Text>Last Name: {lastName}</Text>
    <Text>Favorite Movie: {favMovie}</Text>
    <Text>Favorite Food: {favFood}</Text>
    <Button onPress={reset} title="Complete" />
  </View>
);

// compose
const ComposeResults = pipe(
  withHandlers({
    reset: ({reset}) => () => {
      reset();
    },
  }),

  Results,
);

// export
const mapStateToProps = state => ({
  data: dataSelector(state),
});

export default connect(
  mapStateToProps,
  {reset},
)(withStyles()(ComposeResults));

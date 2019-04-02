import React from 'react';
import {connect} from 'react-redux';
import {pipe, withHandlers} from '@synvox/rehook';

import {Button, Text, View} from 'react-native';

import {reset} from '../actions';

// styles
const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
};

// render
const Results = ({reset}) => (
  <View style={styles.view}>
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
export default connect(
  null,
  {reset},
)(ComposeResults);

import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import {boundMethod} from 'autobind-decorator';

import {transition} from '../actions';
import {ONE} from '../../../routes';

const style = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 36,
  },
};

class Two extends Component {
  @boundMethod
  handlePress() {
    this.props.transition(ONE);
  }

  render() {
    return (
      <View style={style.view}>
        <Button style={style.text} title="Goodbye" onPress={this.handlePress} />
      </View>
    );
  }
}

export default connect(
  null,
  {transition},
)(Two);

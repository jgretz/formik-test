import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import {boundMethod} from 'autobind-decorator';

import {transition} from '../actions';
import {TWO} from '../../../routes';

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

class One extends Component {
  @boundMethod
  handlePress() {
    this.props.transition(TWO);
  }

  render() {
    return (
      <View style={style.view}>
        <Button style={style.text} title="Hello" onPress={this.handlePress} />
      </View>
    );
  }
}

export default connect(
  null,
  {transition},
)(One);

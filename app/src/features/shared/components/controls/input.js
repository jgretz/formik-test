import PropTypes from 'prop-types';
import {TextInput} from 'react-native';

export default class Input extends TextInput {
  static propTypes = {
    focus: PropTypes.bool,
  };

  static defaultProps = {
    focus: false,
  };

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    const {focus} = this.props;
    if (focus && !this.isFocused()) {
      this.focus();
    }
  }
}

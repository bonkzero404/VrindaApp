/* @flow */
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

type PropTypes = {
  onPress?: () => void,
  caption: String,
  style?: Object,
  color?: String,
};

const Button = (props: PropTypes) => (
  <TouchableOpacity
    style={[styles.buttonContainer, props.style]}
    onPress={props.onPress}
  >
    <Text
      style={[
        styles.buttonText,
        { color: props.color },
      ]}
    >
      {props.caption}
    </Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  onPress: () => (false),
  style: styles.buttonContainer,
  color: '#fff',
};

export default Button;

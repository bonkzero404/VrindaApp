/* @flow */
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type PropTypes = {
  backgroundColor?: string,
  successColor?: string,
  foregroundColor?: string,
  errorColor?: string,
  maxWidth?: Number,
  minWidth?: Number,
  scaleFactor?: Number,
  static: Boolean,
  onPress: any,
  onSuccess: () => void,
  scaleOnSuccess: Boolean,
};

export default class ButtonAnimate extends PureComponent<PropTypes> {
  state = { step: 0, error: false };

  animated = new Animated.Value(0);
  micro = new Animated.Value(0);

  successBackgroundColor = this.animated.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      this.props.backgroundColor || 'white',
      this.props.backgroundColor || 'white',
      this.props.successColor || this.props.foregroundColor || 'green',
    ],
  });

  errorBbackgroundColor = this.animated.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      this.props.backgroundColor || 'white',
      this.props.backgroundColor || 'white',
      this.props.errorColor || this.props.foregroundColor || 'red',
    ],
  });

  width = this.animated.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      this.props.maxWidth || 240,
      this.props.minWidth || 40,
      this.props.minWidth || 40,
    ],
  });

  shake = this.micro.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 10, -10],
  });

  scale = this.micro.interpolate({
    inputRange: [0, 1],
    outputRange: [1, this.props.scaleFactor || 1.1],
  });

  press = () => {
    if (this.props.static) {
      if (this.props.onPress) this.props.onPress();
    } else {
      this.setState({ step: 1 });

      Animated.spring(this.animated, { toValue: 1 }).start(animation => {
        if (animation.finished && this.props.onPress) this.props.onPress();
      });
    }
  };

  success = () => {
    this.setState({ step: 2 });

    Animated.spring(this.animated, { toValue: 2 }).start(animation => {
      if (animation.finished && this.props.onSuccess) this.props.onSuccess();
    });

    if (this.props.scaleOnSuccess)
      Animated.sequence([
        Animated.timing(this.micro, { toValue: 1, duration: 80 }),
        Animated.timing(this.micro, { toValue: 0, duration: 80 })
      ]).start();
  };

  error = () => {
    this.setState({ step: 2, error: true });

    Animated.spring(this.animated, { toValue: 2 }).start(animation => {
      if (animation.finished && this.props.onError) this.props.onError();
    });

    if (this.props.shakeOnError)
      Animated.sequence([
        Animated.timing(this.micro, { toValue: 0, duration: 40 }),
        Animated.timing(this.micro, { toValue: 2, duration: 40 }),
        Animated.timing(this.micro, { toValue: 0, duration: 40 })
      ]).start();
  };

  reset = () => {
    this.setState({ step: 0 });

    Animated.spring(this.animated, { toValue: 0 }).start(animation => {
      if (animation.finished && this.props.onReset) this.props.onReset();
    });
  };

  load = () => {
    this.setState({ step: 1 });

    Animated.spring(this.animated, { toValue: 1 }).start(animation => {
      if (animation.finished && this.props.onLoad) this.props.onLoad();
    });
  };

  render() {
    const Icon = this.props.iconSet ? this.props.iconSet : FontAwesome;

    const button = (
      <Animated.View
        style={[
          {
            alignItems: 'center',
            backgroundColor: this.props.disabled
              ? this.props.disabledBackgroundColor || 'gray'
              : this.props.noFill
                ? this.props.backgroundColor || 'white'
                : this.state.error
                  ? this.errorBbackgroundColor
                  : this.successBackgroundColor,
            borderColor: this.props.disabled
              ? this.props.disabledBackgroundColor || 'gray'
              : this.state.step === 2
                ? this.state.error
                  ? this.props.errorColor || this.props.foregroundColor || 'red'
                  : this.props.successColor ||
                    this.props.foregroundColor ||
                    'green'
                : this.props.foregroundColor || 'black',
            flex: 0,
            justifyContent: 'center',
            transform: [
              this.state.error
                ? { translateX: this.shake }
                : { scale: this.scale }
            ],
            width: this.width
          },
          styles.button,
          this.props.style
        ]}>
        {this.state.step === 0 && (
          <View>
            {this.props.labelIcon ? (
              <Icon
                color={
                  this.props.disabled
                    ? this.props.disabledForegroundColor || 'white'
                    : this.props.foregroundColor || 'black'
                }
                name={this.props.labelIcon}
                size={this.props.iconSize || 17}
              />
            ) : (
              <Text
                style={[
                  {
                    color: this.props.disabled
                      ? this.props.disabledForegroundColor || 'white'
                      : this.props.foregroundColor || 'black'
                  },
                  styles.label,
                  this.props.labelStyle
                ]}>
                {this.props.label}
              </Text>
            )}
          </View>
        )}
        {this.state.step === 1 &&
          (this.props.renderIndicator || (
            <ActivityIndicator color={this.props.foregroundColor || 'black'} />
          ))}
        {this.state.step === 2 &&
          (this.props.renderIcon || (
            <Icon
              color={
                this.state.error
                  ? this.props.errorIconColor || 'white'
                  : this.props.successIconColor || 'white'
              }
              name={
                this.state.error
                  ? this.props.errorIconName
                  : this.props.successIconName
              }
              size={this.props.iconSize || 17}
            />
          ))}
      </Animated.View>
    );

    const props = {
      disabled:
        (this.state.step !== 0 && !this.props.onSecondaryPress) ||
        this.props.disabled,
      onPress:
        (this.state.step !== 0 && this.props.onSecondaryPress) || this.press,
      children: button
    };

    if (this.props.bounce) return <TouchableBounce {...props} />;

    return <TouchableOpacity {...props} />;
  }
}

const styles = {
  button: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 40,
    marginBottom: 10,
    marginTop: 10
  },
  label: { padding: 9 }
};

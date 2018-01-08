/* @flow */
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Animated,
  StatusBar,
} from 'react-native';
import type { Element } from 'react';
import LoginForm from './LoginForm';
import styles from './styles';
import AppLogo from '../images/logo-dark-bg.png';

const springValue = new Animated.Value(0.3);

const SpringAnimateLogo = () : any => {
  Animated.spring(springValue, {
    toValue: 1,
    friction: 1,
  }).start();
};

const Login = (): Element<*> => {
  // Init spring animation
  SpringAnimateLogo();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(255, 255, 255, .2)"
        barStyle="light-content"
      />
      <View style={styles.loginContainer}>
        <Animated.Image
          resizeMode="contain"
          style={{
            position: 'absolute',
            width: 300,
            height: 150,
            transform: [{ scale: springValue }],
          }}
          source={AppLogo}
        />
      </View>
      <View>
        <LoginForm />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

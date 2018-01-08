/* @flow */
import React from 'react';
import type { Element } from 'react';
import { StatusBar } from 'react-native';
import { MenuContext } from 'react-native-menu';
import styles from './styles';

type PropTypes = {
  backgroundColor?: string,
  children?: Element<*> | any,
};

// create a component
const Container = (props: PropTypes): Element<*> => (
  <MenuContext style={[styles.container, { backgroundColor: props.backgroundColor }]}>
    <StatusBar
      translucent
      backgroundColor="rgba(255, 255, 255, .2)"
      barStyle="light-content"
    />
    {props.children}
  </MenuContext>
);

Container.defaultProps = {
  backgroundColor: '#ffffff',
  children: null,
};

export default Container;

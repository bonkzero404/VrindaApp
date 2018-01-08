/* @flow */
import React from 'react';
import type { Element } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

type PropTypes = {
  backgroundColor?: string,
  leftContent?: Element<*> | any,
  rightContent?: Element<*> | any,
  leftSize?: number,
  rightSize?: number,
  caption?: string,
  withTitle?: bool,
};

// create a component
const Header = (props: PropTypes): Element<*> => (
  <View style={[styles.navBar, { backgroundColor: props.backgroundColor }]}>
    <View style={[styles.navBarButton, { width: props.leftSize }]}>
      {props.leftContent}
    </View>
    {props.withTitle && (
      <View style={styles.navBarHeader}>
        {props.caption && (
          <Text style={styles.headerText}>{props.caption}</Text>
        )}
      </View>
    )}
    <View style={[styles.navBarButton, { width: props.rightSize }]}>
      {props.rightContent}
    </View>
  </View>
);

Header.defaultProps = {
  backgroundColor: '#BE25B1',
  leftContent: null,
  rightContent: null,
  leftSize: 65,
  rightSize: 65,
  caption: 'Header',
  withTitle: true,
};

export default Header;

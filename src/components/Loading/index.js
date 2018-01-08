import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import styles from './styles';

const Loading = () => (
  <View style={styles.container}>
    <Spinner color="#ffffff" style={styles.loadingContainer} type="Pulse" />
  </View>
);

export default Loading;

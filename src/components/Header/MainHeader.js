/* @flow */
import React from 'react';
import type { Element } from 'react';
import { Text, View, TouchableOpacity, Alert, Animated, Easing, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { reloadDeviceList } from '../../actions/devicelist';
import Header from './index';
import styles from './styles';

type PropTypes = {
  onSelect: (val: any) => void,
  caption: string,
  reloadDeviceList: () => any,
};
const TIMES = 400;
const angleValue = new Animated.Value(0);

const MainHeader = (props: PropTypes): Element<*> => {
  const refreshAnimate = () => {
    Animated.timing(angleValue, {
      toValue: 360 * TIMES,
      duration: 300 * TIMES,
      easing: Easing.linear,
    }).start();
  };

  return (
    <Header
      withTitle={false}
      rightSize={100}
      leftContent={
        <Text style={{ fontSize: 20, color: '#fff', marginLeft: 20 }}>
          {props.caption}
        </Text>
      }
      rightContent={
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.refreshIconButton}
            onPress={() => {
              refreshAnimate();
              props.reloadDeviceList().then((res) => {
                angleValue.setValue(0);
                if (res.valid === false) {
                  Alert.alert(res.messages[0]);
                } else {
                  ToastAndroid.show(res.messages[0], ToastAndroid.LONG);
                }
              }).catch(() => {
                Alert.alert('Terjadi kesalahan dalam memuat data');
                angleValue.setValue(0);
              });
            }}
          >
            <Animated.View style={[
              styles.rotateCard,
                {
                  transform: [
                  {
                    rotate: angleValue.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }]}
            >
              <Icon name="ios-refresh" size={30} color="#ffffff" />
            </Animated.View>
          </TouchableOpacity>
          <Menu
            style={styles.toggleMenu}
            onSelect={props.onSelect}
          >
            <MenuTrigger
              renderTouchable={
                () => <TouchableOpacity style={styles.menuToggleHighlight} />
              }
            >
              <Icon name="md-more" size={30} color="#ffffff" />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={1} renderTouchable={() => <TouchableOpacity />}>
                <Text>Pengaturan</Text>
              </MenuOption>
              <MenuOption value={2} renderTouchable={() => <TouchableOpacity />}>
                <Text>Profil Saya</Text>
              </MenuOption>
              <MenuOption value={3} renderTouchable={() => <TouchableOpacity />}>
                <Text>Tambah Pengguna</Text>
              </MenuOption>
              <MenuOption value={4} renderTouchable={() => <TouchableOpacity />}>
                <Text>Keluar</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      }
    />
  );
};

const mapDispatchToProps = dispatch => ({
  reloadDeviceList: () => dispatch(reloadDeviceList()),
});

export default connect(
  null,
  mapDispatchToProps,
)(MainHeader);

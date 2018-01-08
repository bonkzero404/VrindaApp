/* @flow */
import React from 'react';
import type { Element } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Header from './index';
import styles from './styles';

type PropTypes = {
  onSelect: (val: any) => void,
  caption: string,
  onRefresh: () => void,
};

const MainHeader = (props: PropTypes): Element<*> => (
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
        <TouchableOpacity style={styles.refreshIconButton} onPress={props.onRefresh}>
          <Icon name="ios-refresh" size={30} color="#ffffff" />
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

export default MainHeader;

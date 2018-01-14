/* @flow */
/* eslint no-nested-ternary: 0 */
import React from 'react';
import type { Element } from 'react';
import { Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { lifecycle, pure } from 'recompose';
import { sendCommand, getStat, statDevice } from '../../actions/devicelist';
import styles from './styles';

type PropTypes = {
  item: Object,
  sendCommand: (id: string, cmd: string) => Promise<*>,
  stat: Object,
  selected: Object,
  statDevice: (o: Object) => void,
}

const enhance: any = lifecycle({
  componentDidMount() {
    if (this.props.item.online !== 0) {
      this.props.getStat(this.props.item.deviceid);
    }
  },
});

// create a component
const ItemLists = (props: PropTypes): Element<*> => {
  const changeStatDevice = (o: Object): void => {
    props.statDevice(o);
  };

  const switchOnOff = (id: string, cmd: string) => {
    props.sendCommand(id, cmd).then((result: any) => {
      if (result.valid === false) {
        Alert.alert(result.messages[0]);
      } else {
        changeStatDevice({
          [id]: cmd,
        });
      }
    }).catch(() => {
      Alert.alert('Telah terjadi kesalahan pada sistem');
    });
  };

  return (
    <View style={{ padding: 20 }}>
      {props.item.online === 0 ? (
        <View
          style={styles.labelOffline}
        >
          <Text style={styles.textColor}>Offline</Text>
        </View>
      ) : (
        <View
          style={styles.labelOnline}
        >
          <Text style={styles.textColor}>Online</Text>
        </View>
      )}
      <Text style={styles.labelFsize}>ID Perangkat : {props.item.deviceid}</Text>
      <Text style={styles.labelFsize}>Nama Perangkat : {props.item.devicelabel}</Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {props.selected.loading &&
          props.selected.id === props.item.deviceid &&
          props.selected.cmd === 'on' ? (
            <View
              style={styles.buttonProgressBackground}
            >
              <ActivityIndicator color="#2ecc71" />
            </View>
        ) : props.item.online === 1 &&
        props.stat &&
        props.stat[props.item.deviceid] === 'on' ? (
          <View
            style={styles.buttonOnOffActive}
          >
            <Text style={styles.textColor}>ON</Text>
          </View>
          ) : (
            <TouchableOpacity
              style={styles.buttonOnOffInActive}
              onPress={() => switchOnOff(props.item.deviceid, 'on')}
            >
              <Text style={styles.textColor}>ON</Text>
            </TouchableOpacity>
          )
        }

        {props.selected.loading &&
          props.selected.id === props.item.deviceid &&
          props.selected.cmd === 'off' ? (
            <View
              style={[styles.buttonProgressBackground, {
                marginLeft: 10,
              }]}
            >
              <ActivityIndicator color="#2ecc71" />
            </View>
        ) :
          props.item.online === 0 ? (
            <View
              style={[styles.buttonOnOffActive, {
                marginLeft: 10,
              }]}
            >
              <Text style={styles.textColor}>OFF</Text>
            </View>
          ) : props.stat && props.stat[props.item.deviceid] === 'off' ? (
            <View
              style={[styles.buttonOnOffActive, {
                marginLeft: 10,
              }]}
            >
              <Text style={styles.textColor}>OFF</Text>
            </View>
            ) : (
              <TouchableOpacity
                style={[styles.buttonOnOffInActive, {
                  marginLeft: 10,
                }]}
                onPress={() => switchOnOff(props.item.deviceid, 'off')}
              >
                <Text style={styles.textColor}>OFF</Text>
              </TouchableOpacity>
            )
          }
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userdata.user,
  device: state.devicelist.device,
  selected: state.devicelist.selected,
  stat: state.devicelist.stat,
});

const mapDispatchToProps = dispatch => ({
  sendCommand: (id, cmd) => dispatch(sendCommand(id, cmd)),
  getStat: id => dispatch(getStat(id)),
  statDevice: o => dispatch(statDevice(o)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(pure(enhance(ItemLists)));

/* @flow */
/* eslint no-nested-ternary: 0 */
import React from 'react';
import type { Element } from 'react';
import { Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { lifecycle, pure } from 'recompose';
import { sendCommand, getStat, statDevice } from '../../actions/devicelist';

type PropTypes = {
  item: Object,
  sendCommand: (id: string, cmd: string, cb: any) => void,
  stat: Object,
  selected: Object,
  statDevice: Object,
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
  const switchOnOff = (id: string, cmd: string) => {
    props.sendCommand(id, cmd, (result) => {
      if (result.valid === false) {
        Alert.alert(result.messages[0]);
      } else {
        props.statDevice({
          [id]: cmd,
        });
      }
    });
  };

  return (
    <View style={{ padding: 20 }}>
      {props.item.online === 0 ? (
        <View
          style={{
            padding: 5,
            backgroundColor: 'red',
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>Offline</Text>
        </View>
      ) : (
        <View
          style={{
            padding: 5,
            backgroundColor: 'green',
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>Online</Text>
        </View>
      )}
      <Text>ID Perangkat : {props.item.deviceid}</Text>
      <Text>Nama Perangkat : {props.item.devicelabel}</Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {props.selected.loading &&
          props.selected.id === props.item.deviceid &&
          props.selected.cmd === 'on' ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#ccc',
                borderRadius: 50,
                marginTop: 10,
              }}
            >
              <ActivityIndicator color="red" />
            </View>
        ) : props.item.online === 1 &&
        props.stat &&
        props.stat[props.item.deviceid] === 'on' ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              backgroundColor: '#BE25B1',
              borderRadius: 50,
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#ffffff' }}>ON</Text>
          </View>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#ccc',
                borderRadius: 50,
                marginTop: 10,
              }}
              onPress={() => switchOnOff(props.item.deviceid, 'on')}
            >
              <Text style={{ color: '#ffffff' }}>ON</Text>
            </TouchableOpacity>
          )
        }

        {props.selected.loading &&
          props.selected.id === props.item.deviceid &&
          props.selected.cmd === 'off' ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#ccc',
                borderRadius: 50,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <ActivityIndicator color="red" />
            </View>
        ) :
          props.item.online === 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#BE25B1',
                borderRadius: 50,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: '#ffffff' }}>OFF</Text>
            </View>
          ) : props.stat && props.stat[props.item.deviceid] === 'off' ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#BE25B1',
                borderRadius: 50,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: '#ffffff' }}>OFF</Text>
            </View>
            ) : (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  backgroundColor: '#ccc',
                  borderRadius: 50,
                  marginLeft: 10,
                  marginTop: 10,
                }}
                onPress={() => switchOnOff(props.item.deviceid, 'off')}
              >
                <Text style={{ color: '#ffffff' }}>OFF</Text>
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
  sendCommand: (id, cmd, cb) => dispatch(sendCommand(id, cmd, cb)),
  getStat: id => dispatch(getStat(id)),
  statDevice: o => dispatch(statDevice(o)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(pure(enhance(ItemLists)));

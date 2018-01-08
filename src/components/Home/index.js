/* @flow */
import React from 'react';
import type { Element } from 'react';
import { Alert, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { push } from 'react-router-redux';
import { lifecycle, pure } from 'recompose';
import { logOut } from '../../actions/login';
import { getDeviceList, reloadDeviceList } from '../../actions/devicelist';
import Container from '../Container';
import MainHeader from '../Header/MainHeader';
import ItemLists from './ItemLists';

let isLoading = {};

type PropTypes = {
  logOut: (cb: any) => void,
  toLogin: () => void,
  device: any,
}

const enhance: any = lifecycle({
  componentDidMount() {
    this.props.getDeviceList();
  },
});

// create a component
const Home = (props: PropTypes): Element<*> => {
  const propsToLogin = props.toLogin;

  const renderSeparator = (): Element<*> => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );

  const selectMenu = (val: any): void => {
    if (val === 1 || val === 2 || val === 3) {
      Alert.alert('Menu ini sedang dalam pengembangan');
    } else if (val === 4) {
      props.logOut(() => propsToLogin());
    }
  };

  if (props.device.data) {
    isLoading = false;
  } else {
    isLoading = true;
  }

  return (
    <Container>
      <MainHeader
        caption="VrindaApp"
        onSelect={selectMenu}
        onRefresh={() => props.reloadDeviceList()}
      />
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={props.device.data.devices}
          renderItem={({ item }) => (
            <ItemLists item={item} />
          )}
          keyExtractor={item => item.deviceid}
          ItemSeparatorComponent={renderSeparator}
        />
      )}

    </Container>
  );
};

const mapStateToProps = state => ({
  user: state.userdata.user,
  device: state.devicelist.device,
});

const mapDispatchToProps = dispatch => ({
  logOut: cb => dispatch(logOut(cb)),
  toLogin: () => dispatch(push('/login')),
  getDeviceList: () => dispatch(getDeviceList()),
  reloadDeviceList: () => dispatch(reloadDeviceList()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(pure(enhance(Home))));

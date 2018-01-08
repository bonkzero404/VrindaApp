/* @flow */
import React from 'react';
import {
  View,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { push } from 'react-router-redux';
import styles from './styles';
import { loginAction, loginfield, userdata } from '../../actions/login';
import { ButtonAnimate } from '../Button';

const { width } = Dimensions.get('window');
const buttonWidth = width - 40;
let bLogin: any = null;

type PropTypes = {
  loginAction: (string, string, Function) => void,
  loginfield: (Object) => void,
  userdata: (Object) => void,
  toHome: () => void,
  field: {
    username: string,
    password: string
  }
};

// create a component
const LoginForm = (props: PropTypes) => {
  // const self = this;
  const propsUserdata = props.userdata;
  const goHome = props.toHome;

  const onButtonLogin = (): void => {
    props.loginAction(
      props.field.username,
      props.field.password,
      (result) => {
        if (result.valid === false) {
          ToastAndroid.show(result.messages[0], ToastAndroid.LONG);
          bLogin.error();
          propsUserdata({});
        } else {
          bLogin.success();
          goHome();
        }
      },
    );
  };

  return (
    <View style={styles.containerForm}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(u: string) => props.loginfield({ username: u })}
        onSubmitEditing={() => LoginForm.passwordInput.focus()}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="Masukan Username"
        underlineColorAndroid="transparent"
        placeholderTextColor="rgba(225,225,225,0.7)"
      />

      <TextInput
        style={styles.input}
        returnKeyType="go"
        onChangeText={p => props.loginfield({ password: p })}
        placeholder="Masukan Kata Sandi"
        underlineColorAndroid="transparent"
        placeholderTextColor="rgba(225,225,225,0.7)"
        secureTextEntry
      />

      <View style={styles.buttonCenter}>
        <ButtonAnimate
          bounce
          ref={(ref) => { bLogin = ref; }}
          foregroundColor="#993190"
          backgroundColor="#993190"
          label="LOGIN"
          onPress={() => onButtonLogin()}
          onSecondaryPress={() => bLogin.reset()}
          renderIndicator={<ActivityIndicator color="#ffffff" />}
          maxWidth={buttonWidth}
          minWidth={50}
          labelStyle={{ color: '#ffffff' }}
          style={{ marginTop: 0, height: 45 }}
          successIconName="check"
          errorIconName="close"
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userdata.user,
  field: state.userdata.field,
  isLoading: state.userdata.isLoading,
});

const mapDispatchToProps = dispatch => ({
  loginAction: (username, password, callback) =>
    dispatch(loginAction(username, password, callback)),
  loginfield: field => dispatch(loginfield(field)),
  userdata: data => dispatch(userdata(data)),
  toHome: () => dispatch(push('/')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));

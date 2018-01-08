import { StyleSheet } from 'react-native';

const styles : Object = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BE25B1',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerForm: {
    padding: 20,
  },
  input: {
    height: 45,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#ffffff',
    borderRadius: 20,
  },
  buttonCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#993190',
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#993190',
    color: '#fff',
  },
});

export default styles;

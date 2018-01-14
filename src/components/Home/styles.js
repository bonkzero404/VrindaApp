import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  renderSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
  labelOffline: {
    padding: 5,
    backgroundColor: '#e74c3c',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  labelOnline: {
    padding: 5,
    backgroundColor: '#2ecc71',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textColor: {
    color: '#ffffff',
  },
  labelFsize: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineBackground: {
    padding: 5,
    backgroundColor: '#2ecc71',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonProgressBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#eeeeee',
    borderRadius: 60,
    marginTop: 10,
  },
  buttonOnOffActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#BE25B1',
    borderRadius: 60,
    marginTop: 10,
  },
  buttonOnOffInActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#2ecc71',
    borderRadius: 60,
    marginTop: 10,
  },
});

export default styles;

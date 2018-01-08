import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    paddingTop: 37,
    height: 80,
    backgroundColor: '#993190',
    elevation: 3,
  },
  navBarButton: {
    flex: 1,
  },
  navBarHeader: {
    flex: 1,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
  },
  navBarHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  refreshIconButton: {
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    right: 35,
  },
  toggleMenu: {
    position: 'absolute',
    right: 10,
  },
  menuToggleHighlight: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;

import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  colorView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 48,
  },
  scrollView: {
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
});

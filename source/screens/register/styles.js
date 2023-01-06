import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  banner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '60%',
    width: '60%',
    borderRadius: 1000,
    borderWidth: 2,
  },
  register: {
    flex: 1,
  },
  inputs: {},
  input: {
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    padding: 5,
  },
  inputText: {
    fontSize: 17,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  registerButtonText: {
    fontSize: 25,
    fontWeight: '500',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

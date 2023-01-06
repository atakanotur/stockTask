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
    borderRadius: 900,
    borderWidth: 2,
  },
  login: {
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
  usernameAndPassword: {},
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  loginButtonText: {
    fontSize: 25,
    fontWeight: '500',
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

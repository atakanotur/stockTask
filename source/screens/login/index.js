import React, {useEffect, useState} from 'react';
import {View, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CommonActions} from '@react-navigation/native';

import {Text, Button, Input, Loading} from '../../components';

import {styles} from './styles';

import {useDispatch, useSelector} from 'react-redux';
import {signInAsync, resetError} from '../../redux/user';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const authResult = useSelector(state => state.user.authResult);
  const error = useSelector(state => state.user.error);
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    if (authResult) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'MainNavigator'}],
        }),
      );
    }
    setButtonDisabled(false);
  }, [authResult]);

  useEffect(() => {
    console.log('error', error);
    if (error !== null) {
      Alert.alert('Error', error.message, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetError());
          },
        },
      ]);
    }
    setButtonDisabled(false);
  }, [error]);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  const [state, setState] = useState({
    username: null,
    password: null,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onChangeUsername = e => {
    setState({
      ...state,
      username: e,
    });
  };

  const onChangePassword = e => {
    setState({
      ...state,
      password: e,
    });
  };

  const login = async () => {
    setButtonDisabled(true);
    dispatch(signInAsync(state));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/C4E0BAQGxPzh2tO2P2g/company-logo_200_200/0/1564989263908?e=1680739200&v=beta&t=qQ4mt4HlF46_hKzrHto1k0zJT8YS4ZC7Iv1gTx24Fjw',
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.login}>
        <View style={styles.inputs}>
          <Text text="Email" style={styles.usernameAndPassword} />
          <Input
            keyboardType="email-address"
            containerStyle={styles.input}
            style={styles.inputText}
            onChangeText={onChangeUsername}
          />
          <Text text="Password" style={styles.usernameAndPassword} />
          <Input
            secureTextEntry={true}
            containerStyle={styles.input}
            style={styles.inputText}
            onChangeText={onChangePassword}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => login()}
            text="Login"
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            disabled={buttonDisabled}
          />
          <Button
            onPress={() => navigation.navigate('Register')}
            text="Register"
            style={styles.registerButton}
            textStyle={styles.registerButtonText}
            disabled={buttonDisabled}
          />
        </View>
      </View>
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
}

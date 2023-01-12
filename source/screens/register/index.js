import React, {useEffect, useState} from 'react';
import {View, Image, Alert} from 'react-native';

import {Text, Input, Button, Loading} from '../../components';
import {styles} from './styles';

import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';

import {registerAsync, resetError} from '../../redux/user';
import {createProductsAsync} from '../../redux/products';

export default function Register({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const authResult = useSelector(state => state.user.authResult);
  const error = useSelector(state => state.user.error);
  const isLoading = useSelector(state => state.user.isLoading);

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
  }, [error]);

  useEffect(() => {
    if (authResult) {
      createProducts();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'MainNavigator'}],
        }),
      );
    }
    setButtonDisabled(false);
  }, [authResult]);

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

  const register = () => {
    dispatch(registerAsync(state));
  };

  const createProducts = () => {
    const payload = {
      userId: user.uid,
      products: [],
    };
    dispatch(createProductsAsync(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{
            uri: 'https://static.thenounproject.com/png/214763-200.png',
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.register}>
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
            onPress={() => register()}
            text="Register"
            style={styles.registerButton}
            textStyle={styles.registerButtonText}
            disabled={buttonDisabled}
          />
          <Button
            onPress={() => navigation.goBack()}
            text="Login"
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            disabled={buttonDisabled}
          />
        </View>
      </View>
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
}

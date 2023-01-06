import React, {useEffect, useState} from 'react';
import {View, Image, Alert} from 'react-native';

import {Text, Input, Button} from '../../components';
import {styles} from './styles';

import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';

import {registerAsync} from '../../redux/user';
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
          onPress: () => console.log('OK'),
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

  const register = async () => {
    dispatch(registerAsync(state));
  };

  const createProducts = () => {
    const payload = {
      userRef: user.uid,
      products: [],
    };
    console.log('payload1', payload);
    dispatch(createProductsAsync(payload));
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
            onPress={() => navigation.navigate('Login')}
            text="Login"
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            disabled={buttonDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Main, Login, Register, Spend} from '../screens';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Register" component={Register} />
    </LoginStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Main" component={Main} />
      <MainStack.Screen name="Spend" component={Spend} />
    </MainStack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="LoginNavigator"
        component={LoginNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

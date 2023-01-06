import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Text} from '../index';

export default function CustomInput(props) {
  const {style, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput {...props} style={[styles.container, style]}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

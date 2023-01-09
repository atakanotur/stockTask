import React from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';

export default function CustomSearchBar(props) {
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

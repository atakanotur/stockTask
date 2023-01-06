import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '..';

export default function CustomButton(props) {
  const {style, text, textStyle} = props;
  return (
    <TouchableOpacity {...props} style={[styles.container, style]}>
      <Text text={text} style={[styles.text, textStyle]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});

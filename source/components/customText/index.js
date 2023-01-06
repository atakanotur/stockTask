import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function CustomText(props) {
  const {text, style} = props;
  return (
    <Text style={[styles.text, style]} {...props}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

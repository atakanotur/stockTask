import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Text} from '..';

export default function CustomLoading(props) {
  const {visible} = props;
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
      <Text text="Loading ..." style={styles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
});

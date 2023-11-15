import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Home() {
    return (
        <View>
            <Text style={styles.fontStyle}>This is the Home page</Text>
            <Text>Testing more</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    fontStyle: {
      fontFamily: 'PlaypenSans',
      fontSize: 20,
      color: 'black'
    }
  });
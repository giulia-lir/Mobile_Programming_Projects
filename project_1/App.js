import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Button, Alert, Text, TextInput, Pressable, View } from 'react-native'; // There is also the <ScrollView> component available

export default function App() {

  const buttonPressed = () => {
    Alert.alert("You typed: " + text); // What about the \n ?
  }

  // Image render TBA

  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>= Hello User =</Text>
      <TextInput style={styles.inputFieldStyle} onChangeText={text => setText(text)} value={text} />
      <Pressable style={styles.buttonStyle} onPress={buttonPressed}>
        <Text style={styles.pressableTextStyle}>Fancy button</Text>
      </Pressable>
      <Button onPress={buttonPressed} title="Lame button" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'lime',
    marginBottom: 20
  },
  inputFieldStyle: {
    color: 'lime',
    width: 200,
    borderColor: 'lime',
    borderWidth: 1,
    marginBottom: 20
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lime',
    margin: 15
  },
  pressableTextStyle: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

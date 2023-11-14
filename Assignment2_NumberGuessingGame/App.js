import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {

  const [input, setInput] = useState("");
  const [randomNum, setRandomNum] = useState(generateNumber());
  const [guesses, setGuesses] = useState(0);
  const [message, setMessage] = useState("Guess a number between 1-100");

  function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  useEffect(() => {
    setRandomNum(generateNumber());
    setGuesses(0);
    setMessage("Guess a number between 1-100");
  }, []);

  const checkGuess = () => {
    const num = parseInt(input);

    if (isNaN(num) || num < 1 || num > 100) {
      Alert.alert("Please enter a valid number between 1 and 100.");
    } else {
      setGuesses(guesses + 1);

      if (num === randomNum) {
        Alert.alert(`You guessed the number in ${guesses} guesses!`);
        setInput("");
        setRandomNum(generateNumber());
        setGuesses(0);
        setMessage("Guess a number between 1-100");
      } else if (num < randomNum) {
        setMessage(`Your guess ${num} is too low`);
        setInput("");
      } else {
        setMessage(`Your guess ${num} is too high`);
        setInput("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>{message}</Text>

      <TextInput
        style={{ width: 200, borderColor: 'black', marginBottom: 10, marginTop: 10, padding: 5, borderWidth: 1 }}
        keyboardType = 'numeric'
        onChangeText={text => setInput(text)}
        value={input}
      />

      <Button title="make guess" onPress={checkGuess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
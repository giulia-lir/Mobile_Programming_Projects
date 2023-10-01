import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [input, setInput] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addInput = () => {
    if (input.trim() != "") {
      setShoppingList([...shoppingList, input]);
      setInput("");
    }
  }

  const clearItems = () => {
    setShoppingList([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List:</Text>
      <TextInput></TextInput>
      <View style={styles.buttonRow}>
        <Button title="Add" onPress={addInput} />
        <Button title="Clear" onPress={clearItems} />
      </View>
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
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 200,
    marginTop: 20,
  },
});

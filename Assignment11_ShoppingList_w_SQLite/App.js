import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

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
      <TextInput 
        style={styles.inputField}
        onChangeText={text => setInput(text)}
        value={input}
      />
      <View style={styles.buttonRow}>
        <Button title="Add" onPress={addInput} />
        <Button title="Clear" onPress={clearItems} />
      </View>
      <Text style={styles.itemsText}>Items:</Text>
      <FlatList
        style={styles.listSection}
        data={shoppingList}
        renderItem={({ item }) => <Text style={styles.itemsText}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20
  },
  inputField: {
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    padding: 5
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 200,
    marginTop: 20,
    marginBottom: 20
  },
  itemsText: {
    fontSize: 20
  },
  listSection: {
    maxHeight: 250,
    width: '80%',
    marginTop: 15
  }
});

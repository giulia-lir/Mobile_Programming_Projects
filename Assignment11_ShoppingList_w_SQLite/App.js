import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as SQLite from 'expo-sqlite';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

//const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {

  const [input, setInput] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    loadShoppingList();
  }, []);

  const loadShoppingList = async () => {
    try {
      const storedList = await AsyncStorage.getItem('fetchingList');
      if (storedList !== null) {
        setShoppingList(JSON.parse(storedList));
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const saveShoppingList = async (list) => {
    try {
      const jsonList = JSON.stringify(list)
      await AsyncStorage.setItem('fetchingList', jsonList);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const addInput = () => {
    if (input.trim() != "") {
      const updatedList = [...shoppingList, input];
      setShoppingList(updatedList);
      saveShoppingList(updatedList);
      setInput("");
    }
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
        <Button title="Save" onPress={addInput} />
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

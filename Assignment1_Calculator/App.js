import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput, FlatList } from 'react-native';


export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const calculateSum = () => {
    if (num1 !== '' && num2 !== '') {
      const sum = parseFloat(num1) + parseFloat(num2);
      setResult(sum);
      addToHistory(`${num1} + ${num2} = ${sum}`);
      setNum1(sum.toString());
      setNum2('');
    } else {
      setResult('??');
    }
  }

  const calculateSubtraction = () => {
    if (num1 !== '' && num2 !== '') {
      const subtraction = parseFloat(num1) - parseFloat(num2);
      setResult(subtraction);
      addToHistory(`${num1} - ${num2} = ${subtraction}`);
      setNum1(subtraction.toString());
      setNum2('');
    } else {
      setResult('??');
    }
  }

  const addToHistory = (entry) => {
    // Keep only the latest 5 entries in history
    setHistory((prevHistory) => [
      { key: Date.now().toString(), entry },
      ...prevHistory.slice(0, 4), // Limit to 5 entries
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Result: {result}</Text>
      <TextInput
        placeholder="Enter number 1"
        keyboardType="numeric"
        onChangeText={(text) => setNum1(text)}
        value={num1}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter number 2"
        keyboardType="numeric"
        onChangeText={(text) => setNum2(text)}
        value={num2}
        style={styles.input}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' , width: 100 }}>
        <Button title=" + " onPress={calculateSum} />
        <Button title=" - " onPress={calculateSubtraction} />
      </View>
      <Text style={{ marginTop: 20 }}>{result}</Text>
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>History:</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => <Text>{item.entry}</Text>}
        keyExtractor={(item) => item.key}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  }
});
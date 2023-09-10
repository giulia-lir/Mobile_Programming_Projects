import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function Calculator( {navigation} ) {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const addToHistory = (entry) => {
        setHistory((prevHistory) => [
            { key: Date.now().toString(), entry },
            ...prevHistory, 
        ]);
    };

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' , width: 100 , margin: 20}}>
          <Button title=" + " onPress={calculateSum} />
          <Button title=" - " onPress={calculateSubtraction} />
        </View>
        <Button title="History" onPress={() => navigation.navigate('History', {history})} />
        <StatusBar style="auto" />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
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

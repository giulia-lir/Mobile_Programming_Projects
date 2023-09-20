import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [result, setResult] = useState(0);

  const url = process.env.EXPO_PUBLIC_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  const getData = () => {
    fetch(url , 
      { headers: { 'apikey' : apiKey }})
    .then(response => response.json())
    .then(data => setRates(data.rates))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    getData();
  }, []);

  // Calculate conversion
  const rateConversion = () => {
    const rate = rates[currency];
    setResult((amount / rate).toFixed(5))
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{fontSize: 24}}>{result} €</Text> 
      <View style={styles.input}>
        <TextInput 
          style={{fontSize: 20, width: 90, marginTop: 40}} 
          placeholder='amount' 
          type="numeric" 
          onChangeText={amount => setAmount(amount)} />
        <Picker style={{height:30, width:150, marginTop: 40}}
          selectedValue={currency}
          onValueChange={value => setCurrency(value)}>
          {
            Object.keys(rates).map(item => 
              <Picker.Item key={item} label={item} value={item} />)
          }
        </Picker>
      </View>
      <Button title="Convert" onPress={rateConversion} />
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
  input: {
    flexDirection: 'row',
  },
});

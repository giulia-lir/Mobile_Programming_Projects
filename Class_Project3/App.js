import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_key,
  authDomain: process.env.EXPO_PUBLIC_domain,
  databaseURL: process.env.EXPO_PUBLIC_dburl,
  projectId: "fe-class-project",
  storageBucket: process.env.EXPO_PUBLIC_storage_bucket,
  messagingSenderId: process.env.EXPO_PUBLIC_senderId,
  appId: process.env.EXPO_PUBLIC_appId,
  measurementId: process.env.EXPO_PUBLIC_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  // project worked on in class, lesson 2.10.2023

  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    onValue(ref(db, '/products'), (snapshot) => {
      const data = snapshot.val();
      // Object.values() extracts the values from the key in object array, Object.keys() is used to get the keys instead
      setProducts(Object.values(data)) 
    })
  }, []);

  const saveProduct = () => {
    push(ref(db, '/products'), product)
    setProduct({title: '', amount: ''})
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={product.title}
        placeholder='product'
        onChangeText={text => setProduct({...product, title: text})} 
      />
      <TextInput
        value={product.amount}
        placeholder='amount'
        onChangeText={text => setProduct({...product, amount: text})} 
      />
      <Button title="Save" onPress={saveProduct}/>
      <FlatList 
        data={products}
        renderItem={({ item }) => 
        <Text>{item.title} {item.amount}</Text>
      }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

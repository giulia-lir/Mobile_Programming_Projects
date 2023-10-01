import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists grocery (id integer primary key not null, product text, amount text);');
    }, () => console.error("Error when creating DB"), updateList); 
  }, []);

  const saveProduct = () => {
    db.transaction(tx => {
        tx.executeSql('insert into grocery (product, amount) values (?, ?);', [product, amount]);    
      }, null, updateList
    )
    setProduct("")
    setAmount("")
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from grocery;', [], (_, { rows }) =>
        setShoppingList(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from grocery where id = ?;', [id]);
      }, null, updateList
    )    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <TextInput 
        style={styles.inputField}
        placeholder="Product"
        onChangeText={text => setProduct(text)}
        value={product}
      />
      <TextInput 
        style={styles.inputField}
        placeholder="Amount"
        onChangeText={text => setAmount(text)}
        value={amount}
      />
      <Button title="Save" onPress={saveProduct} />
      <Text style={styles.itemsText}>Items:</Text>
      <FlatList
        style={styles.listSection}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={styles.listItemsView}>
            <Text>{item.product}, {item.amount}</Text>
            <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>Bought</Text>
          </View>
        }
        data={shoppingList}
        showsVerticalScrollIndicator={true}
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
  itemsText: {
    fontSize: 20,
    marginTop: 10
  },
  listSection: {
    maxHeight: 250,
    width: '80%',
    marginTop: 15
  },
  listItemsView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    justifyContent: 'space-between',
    alignItems: 'space-evenly',
    padding: 5
  }
});

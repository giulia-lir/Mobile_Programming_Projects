import { useState } from 'react';
import { Alert, StyleSheet, Text, Button, TextInput, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {

  const [repositories, setRepositories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const fetchRepositories = () => {
    setIsVisible(true);
    fetch(process.env.EXPO_PUBLIC_API_URL + "?q=" +keyword)
    .then(response => response.json())
    .then(data => {
      setRepositories(data.items)
      setIsVisible(false);
    })
    .catch(err => {
      setIsVisible(false);
      Alert.alert('Error', 'Something went wrong')
      console.log(err)
    });
  }
 
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={isVisible} size="large"  />
      <FlatList 
        data={repositories}
        renderItem={({item}) => 
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{item.full_name}</Text>
            <Text style={{ fontSize: 16 }}>{item.description}</Text>
          </View>
        }
      />
      <TextInput
        value={keyword}
        onChangeText={text => setKeyword(text)}
        placeholder='Keyword' />
      <Button title='fetch' onPress={fetchRepositories} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

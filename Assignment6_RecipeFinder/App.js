import { useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const fetchRecipes = () => {
    setIsVisible(true);
    fetch(process.env.EXPO_PUBLIC_API_URL + "?i=" + ingredient)
    .then(response => response.json())
    .then(data => {
      setRecipes(data.meals)
      setIsVisible(false);
    })
    .catch(err => {
      setIsVisible(false);
      Alert.alert('Error', 'Something went wrong')
    });
  }
 
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={ingredient}
        onChangeText={text => setIngredient(text)}
        placeholder='Keyword' />
      <Button title='find' onPress={fetchRecipes} />
      <ActivityIndicator animating={isVisible} size="large"  />
      <FlatList 
        data={recipes}
        renderItem={({item}) => 
          <View style={styles.recipeContainer}>
            <Text style={styles.recipeTitle}>{item.strMeal}</Text>
            <Image
              style={styles.thumbnail}
              source={{ uri: item.strMealThumb }}
            />
          </View>
        }
      />
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
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    marginTop: 25,
    marginBottom: 10,
    width: 200
  },
  recipeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 5,
    alignItems: 'center'
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  thumbnail: {
    width: 75,
    height: 75,
  },
});

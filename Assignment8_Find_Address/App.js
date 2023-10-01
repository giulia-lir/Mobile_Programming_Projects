import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [address, setAddress] = useState('');
  const [result, setResult] = useState({
    lat: 51.5074,
    lng: -0.1278
  });

  // The current fetching only gets the first address found, this can be improved for when handling multiple addresses

  const fetchAddress = () => {
    fetch(url + "?key=" + apiKey + "&location=" + address)
    .then(response => response.json())
    .then(data => {
      const latLang = data.results[0].locations.map((location) => location.latLng)
      setResult(latLang)
      console.log(latLang)
      //setResult(data.results[0].locations[0].latLng)
      //const locationsArray = data.results.map((result) => ({
        //latLng: result.locations.map((location) => location.latLng.latLng),
        // Add other properties you want from each location here
     // }));
      //setResult(locationsArray)
      //console.log(locationsArray)
    })
    .catch(err => {
      Alert.alert('Error', 'Something went wrong')
    });
  }

  const url = process.env.EXPO_PUBLIC_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const coordinates = {
    latitude: result.lat,
    longitude: result.lng,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={coordinates}>
          <Marker
            coordinate={coordinates}
            title='Here'
          />
      </MapView>
      <View style={styles.searchField}>
        <Text>Find address:</Text>
        <TextInput
          placeholder="Enter an address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Button title="find" onPress={fetchAddress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    flex: 4
  },
  searchField: {
    flex: 1,
    width: '100%',
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

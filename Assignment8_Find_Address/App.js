import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const londonCoordinates = {
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  };

  const coordinates = {
    latitude: 60.201373,
    longitude: 24.934041
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={londonCoordinates}>
          <Marker
            coordinate={londonCoordinates}
            title='London'
          />
      </MapView>
      <View style={styles.inputField}>
        <Text>Address</Text>
        <TextInput placeholder="Enter an address"></TextInput>
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
    height: '85%',
  },
  inputField: {
    height: 100,
    width: '100%',
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

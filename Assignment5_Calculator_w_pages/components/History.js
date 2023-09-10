import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function History( {route} ) {
    const { history } = route.params;

    return (
    <View style={styles.container}>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

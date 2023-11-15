import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/home';
import Settings from './components/settings';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator style={styles.navigatorTabsStyle}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigatorTabsStyle: {
    marginTop: 50,
  },
  tabStyle: {
    backgroundColor: 'pink',
  },
});

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Home from './components/home';
import Settings from './components/settings';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'PlaypenSansBold': require('./assets/fonts/PlaypenSans-ExtraBold.ttf'),
    'PlaypenSans': require('./assets/fonts/PlaypenSans-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
          tabBarStyle: styles.navigatorTabsStyle, // overall style
          // tabStyle: styles.tabStyle,  specific tab style
          tabBarLabelStyle: styles.tabFontStyle,
        }} onLayout={onLayoutRootView}>
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
    backgroundColor: '#40E0D0',
  },
  tabFontStyle: {
    fontFamily: 'PlaypenSansBold',
    fontSize: 16,
    color: 'black'
  }
});

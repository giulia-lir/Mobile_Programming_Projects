import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Bottom tabs navigation is the choice for this project
import Ionicons from '@expo/vector-icons/Ionicons'; // Expo provided icons
import Home from './components/Home';
import Settings from './components/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({ // Navigator can be customized using screenOptions
        tabBarIcon: ({ focused, color, size }) => {
        // Function tabBarIcon is given the focused state,
        // color and size params
        let iconName;

        if (route.name === 'Home') {
          iconName = 'md-home';
        } else if (route.name === 'Settings') {
          iconName = 'md-settings';
        }
        return <Ionicons name={iconName} size={size} color={color} />; //it returns an icon component
      },
    })}>
        <Tab.Screen name="Home" component={Home} options={{ title: 'My app' }} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
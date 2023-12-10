import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebaseConfig } from './firebaseConfig';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Login' component = {LoginScreen} />
        <Stack.Screen name = 'Home' component ={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
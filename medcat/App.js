import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screens
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ScanScreen from './screens/ScanScreen';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Scan" component={ScanScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


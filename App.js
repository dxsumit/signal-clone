import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import AddChat from './Components/AddChatScreen';
import ChatScreen from './Screens/ChatScreen';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator screenOptions={{
                                  headerStyle: {backgroundColor: "#4166F5"},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: "#fff"}
                                  }}>

        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddChatScreen' component={AddChat} />
        <Stack.Screen name='ChatScreen' component={ChatScreen} />

      </Stack.Navigator>

    </NavigationContainer>
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

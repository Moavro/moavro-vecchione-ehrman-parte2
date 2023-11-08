import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from './src/screens/Register/Register'
import Login from "./src/screens/Login/Login"
import Home from "./src/screens/Home/Home";
import Posteo from "./src/screens/Posteo/Posteo";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Register" component={Register} options={ { headerShown: false } }/> 
        <Stack.Screen name= "Login" component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name= "Home" component={Home} options={ { headerShown: false } }/> 
        <Stack.Screen name= "Posteo" component={Posteo} options={ { headerShown: false } }/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

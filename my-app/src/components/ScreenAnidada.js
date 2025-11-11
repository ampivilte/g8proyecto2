import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Comentarios from "../screens/Comentarios";

const Stack = createNativeStackNavigator()

export class ScreenAnidada extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Comentarios" component={Comentarios} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  }
}

export default ScreenAnidada





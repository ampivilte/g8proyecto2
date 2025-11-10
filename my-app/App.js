import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./src/firebase/config";
import { ActivityIndicator, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabsDeApp() {
  return(
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="HomeScreen" component={HomeScreen}/>
        
    </Tab.Navigator>
  );
}

class NavegadorPrincipal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      logueado: false,
    }
  };

  componentDidMount(){
    auth.onAuthStateChanged ((usuario)=>{
      if (usuario) {
        this.setState({logueado: true});
      } else{
          this.setState({logueado:false});
      }
    });
  }

  render(){
    //loader para cuando no se si hay usuario
    if(this.state.logueado === null){
      return(
        <View>
          <ActivityIndicator size={'large'}/>
        </View>
      );
    };

    return(
      <NavigationContainer>
        {this.state.logueado ? (
          <TabsDeApp/>
        ) : (
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  };
} 



export default function App() {
  return (
   <NavegadorPrincipal/>
  );
}
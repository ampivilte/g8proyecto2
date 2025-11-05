import React, { Component } from "react";
import { Text, View, Pressable } from "react-native-web";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from "../firebase/config";

export class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      userName: '',
      registered: false,
      error: '',
    }
  }

  register(email, pass) {
    auth.createUserWithEmailAndPassword(email, pass)
    .then(response => {
      this.setState({registered: true});
      this.props.navigation.navigate('Login');
    })
    .catch(error => {
      this.setState({error: 'Error al registrarte a Petl :('})
    })
  }

  render() {
    return (
      <View>
        <Text>¡Registrate a Petly!</Text>
        <Text>Bienveid@ a Petly, completá el formulario para ser parte de nuestra red social.</Text>

        <View>
          <TextInput
            keyboardType='email-adress'
            placeholder='email'
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />

          <TextInput style={styles.formInput}
            keyboardType='password'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />

          <TextInput style={styles.formInput}
            keyboardType='default'
            placeholder='user name'
            onChangeText={text => this.setState({ userName: text })}
            value={this.state.userName}
          />

          <Pressable onPress={() => this.register(this.state.email, this.state.password)}>
            <Text>Registrarme</Text>
          </Pressable>

          <Pressable onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Ir al login</Text>
          </Pressable>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30
  },

})

export default Register

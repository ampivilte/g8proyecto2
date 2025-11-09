import React, { Component } from "react";
import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

export class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      userName: '',
      registered: false,
      error: '',
      owner: '',
      createdAt: '',
    }
  }

  register(email, pass) {

    if(this.state.email === '') {
      this.setState({ error: "Email obligatorio!"});
    } else if(this.state.password === '') {
      this.setState({ error: "Contraseña obligatoria!"})
    } else if(this.state.userName === '') {
      this.setState({ error: "Nombre de usuario obligatorio!"})
    } else {
      auth.createUserWithEmailAndPassword(email, pass)
      .then(() => {
        db.collection('users').add({
          owner: auth.currentUser.email, 
          createdAt: Date.now(),
          email: this.state.email,
          userName: this.state.userName,
        });
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        this.setState({ error: 'Error al registrarte a Petly :('})
      })
    }
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

          <Text>{this.state.error}</Text>

          <Pressable onPress={() => this.register(this.state.email, this.state.password)}>
            <Text>Registrarme</Text>
          </Pressable>

          <Pressable onPress={() => this.props.navigation.navigate('Login')}>
            <Text>¡Ya tengo cuenta en Petly!</Text>
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

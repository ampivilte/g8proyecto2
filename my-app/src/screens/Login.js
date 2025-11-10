import React, { Component } from "react";
import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            logged: false,
            error: ''
        }
    }

    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
        .then(response => {
            this.setState({ logged: true });
            this.props.navigation.navigate('Home');
        })
        .catch(error => {
            this.setState({ error: 'Credenciales inválidas'})
        })
    }

    render() {
        return(
            <View>
                <Text>Loguearme a Petly!</Text>
                <Text>Hola! Para ingresar a tu cuenta Petly, completá con tu email y contraseña.</Text>

                <View>
                    <TextInput
                        keyboardType='email-address'
                        placeholder="email"
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                    />

                    <TextInput
                        keyboardType='password'
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text})}
                        value={this.state.password}
                    />

                    <Pressable>
                        <Text>Login</Text>
                    </Pressable>

                    <Pressable onPress={() => this.props.navigation.navigate('Register')}>
                        <Text>¡No tengo cuenta en Petly!</Text>
                    </Pressable>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
    },
})

export default Login
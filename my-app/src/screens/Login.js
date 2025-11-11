import React, { Component } from "react";
import { Text, View, Pressable, Image, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { auth } from "../firebase/config";

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }
    
    componentDidMount() {
        auth.onAuthStateChanged(user => { 
            if(user) {
                this.props.navigation.navigate('HomeMenu')
            }
        })
    }

    login(email, pass) {

        if(this.state.email === '') {
            this.setState({ error: "Ingrese su email correctamente"});
        } else if(this.state.password === '') {
            this.setState({ error: "Ingrese su contraseña correctamente"})
        } else {
            auth.signInWithEmailAndPassword(email, pass)
            .then(response => {
                this.props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                this.setState({ error: "Error al hacer el login"})
            })
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../../assets/logoPetly.jpg')} resizeMode="contain" style={styles.logo}/>
                <Text style={styles.title}>¡Login!</Text>
                <br></br>
                <Text style={styles.subtitle}>Para ingresar a tu cuenta Petly, completá con tu email y contraseña.</Text>

                <View style={styles.form}>
                    <TextInput
                        keyboardType='email-address'
                        placeholder="email"
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                        style={styles.input}
                    />

                    <TextInput
                        keyboardType='password'
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text})}
                        value={this.state.password}
                        style={styles.input}
                    />

                    <Text style={styles.error}>{this.state.error}</Text>
                    
                    <Pressable onPress={() => this.login(this.state.email, this.state.password)} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>

                    <Pressable onPress={() => this.props.navigation.navigate('Register')} style={styles.linkContainer}>
                        <Text style={styles.linkText}>¡No tengo cuenta en Petly!</Text>
                    </Pressable>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#faf5eb",
        padding: 25,
    },
    
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6B4EFF",
        marginBottom: 5,
    },
    
    subtitle: {
        color: "#555",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 25,
    },
    
    form: {
        width: "85%",
        alignItems: "center",
    },
    
    input: {
        borderWidth: 3,
        borderColor: "#A2D9CE",
        borderRadius: 12,
        backgroundColor: "#fff",
        padding: 12,
        width: "100%",
        marginBottom: 15,
        fontSize: 15,
    },
    
    button: {
        backgroundColor: "#6B4EFF",
        paddingVertical: 12,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
        marginTop: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    
    error: {
        color: "#E63946",
        fontWeight: "bold",
        marginBottom: 10,
    },
    
    linkContainer: {
        marginTop: 15,
    },
    
    linkText: {
        color: "#6B4EFF",
        fontWeight: "600",
    },
})

export default Login

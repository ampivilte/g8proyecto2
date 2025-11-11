import React, { Component } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { TextInput } from "react-native";
import { db } from "../firebase/config";
import { StyleSheet } from "react-native";

export class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: '',
            createdAt: '',
            post: '',
            likes: [],
            error: '',
            mensaje: '',
        }
    }

    subirPost() {
        if (this.state.post === '') {
            this.setState({ error: "Tu post está vacío!" })
        } else {
            db.collection('posts').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                post: this.state.post,
                likes: [],
                comentarios: []
            })
                .then(() => {
                    this.setState({ post: '' })
                })
                .catch(() => {
                    this.setState({ error: "Error al publicar tu post." })
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/petlyPerrito.jpg')} resizeMode="contain" style={styles.logo} />

                <Text style={styles.titulo}>Subir post en Petly</Text>
                <View>
                    <TextInput
                        keyboardType="default"
                        placeholder="comentario..."
                        onChangeText={text => this.setState({ post: text })}
                        value={this.state.post}
                        style={styles.input}
                    />

                    <Pressable onPress={() => this.subirPost()} style={styles.boton}>
                        <Text style={styles.botonTexto}>Publicar</Text>
                    </Pressable>

                    <Text style={styles.mensaje}>{this.state.mensaje}</Text>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#faf5eb",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6B4EFF",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        borderWidth: 3,
        borderColor: "#A2D9CE",
        borderRadius: 15,
        padding: 15,
        backgroundColor: "#fff",
        textAlignVertical: "top",
        marginBottom: 15,
        fontSize: 16,
    },
    boton: {
        backgroundColor: "#6B4EFF",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginTop: 10,
    },
    botonTexto: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center"
    },
    error: {
        color: "#FF3B3B",
        marginBottom: 10,
        fontSize: 14,
    },
    mensaje: {
        color: "#6B4EFF",
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
})

export default NewPost
import React, { Component } from 'react'
import { Text, View, FlatList, Pressable } from 'react-native'
import { TextInput } from 'react-native-web'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export class Comentarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
            error: '',
            posteo: []
        }
    }

    componentDidMount() {
        let id = this.props.route.params.id

        db.collection('posts')
            .doc(id)
            .onSnapshot((docs) => {
                console.log(docs.data())
                this.setState({ posteo: docs.data() })
            })
    }

    subirPost() {
        let id = this.props.route.params.id

        if (this.state.post === '') {
            this.setState({ error: "Tu post está vacío!" })
        } else {
            db.collection('posts').doc(id).update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    post: this.state.post,
                })
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
            <Text style={styles.header}>Comentarios</Text>
            <Text style={styles.infoPost}>{this.state.posteo.post}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="comentario..."
                    onChangeText={text => this.setState({ post: text })}
                    value={this.state.post}
                />

                <Pressable onPress={() => this.subirPost()} style={styles.botonComentario}>
                    <Text style={styles.textoBotonComentario}>Publicar comentario</Text>
                </Pressable>

                <FlatList
                    data={this.state.posteo.comentarios}
                    keyExtractor={(item) => item.createdAt + item.owner}
                    renderItem={({ item }) => (
                        <Text style={styles.comentario}>{item.post}</Text>
                    )}
                />

                <Text style={styles.errorText}>{this.state.error}</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#faf5eb",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6B4EFF",
        marginBottom: 20,
    },
    infoPost: {
        fontSize: 18,
        color: "#555",
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
    },
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    botonComentario: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#6B4EFF",
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
    },
    textoBotonComentario: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    comentario: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        marginTop: 10,
    },
});


export default Comentarios



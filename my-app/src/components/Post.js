import React, { Component } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
        }
    }

    componentDidMount() {
        if(this.props.data.likes.includes(auth.currentUser.email)) {
            this.setState({ likeado: true })
        }
    }

    likePost() {
        db.collection('posts')
        .doc(this.props.id)
        .update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)})
        .then(() => this.setState({ likeado: true}))
    }

    sacarLikePost() {
        let likesActualizados = this.props.data.likes.filter((email) => email !== auth.currentUser.email)
        db.collection('posts')
        .doc(this.props.id)
        .update({ likes: likesActualizados })
        .then(() => this.setState({ likeado: false }))
    }
    

    render() {
        return(
            <View style={styles.contenedorPost}>
                <Text style={styles.textoPropietario}>{this.props.data.owner}</Text>
                <Text style={styles.textoPost}>{this.props.data.post}</Text>

                <View style={styles.contenedorAcciones}>
                    <Text style={styles.cantidadLikes}>{this.props.data.likes.length}</Text>
                    <Pressable 
                        onPress={() => this.state.likeado ? this.sacarLikePost() : this.likePost()} 
                        style={styles.botonLike}
                    >
                        <Text style={styles.textoBotonLike}>
                            {this.state.likeado ? "❤️ Quitar like" : "🤍 Like"}
                        </Text>
                    </Pressable>

                    <Pressable 
                        onPress={() => this.props.navigation.navigate('Comentarios', {id: this.props.id})} 
                        style={styles.botonComentar}
                    >
                        <Text style={styles.textoBotonComentar}>💬 Comentar</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedorPost: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    textoPropietario: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    textoPost: {
        fontSize: 16,
        color: "#555",
        marginBottom: 15,
    },
    contenedorAcciones: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cantidadLikes: {
        fontSize: 16,
        color: "#6B4EFF",
    },
    botonLike: {
        padding: 10,
        backgroundColor: "#faf5eb",
        borderRadius: 5,
    },
    textoBotonLike: {
        color: "#6B4EFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    botonComentar: {
        padding: 10,
        backgroundColor: "#faf5eb",
        borderRadius: 5,
    },
    textoBotonComentar: {
        color: "#6B4EFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Post
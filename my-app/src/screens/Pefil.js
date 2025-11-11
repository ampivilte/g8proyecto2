import React, { Component } from "react";
import { Text, View, Pressable, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import { Post } from "../components/Post";

export class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            posts: [],
        }
    }

    componentDidMount() {
        let userActivo = auth.currentUser

        db.collection('users')
        .where("email", "==", userActivo.email)
        .onSnapshot((docs) => {
            let datosUser = {};
            docs.forEach((doc) => (datosUser = doc.data()))
            this.setState({ user: datosUser })
        })

        db.collection('posts')
        .where("owner", "==", userActivo.email)
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {
            let postsUser =  []
            docs.forEach((doc) => { postsUser.push({ id: doc.id, data: doc.data()})})
            this.setState({posts: postsUser})
        })
    }

    logout() {
        auth.signOut()
        .then(() => this.props.navigation.navigate('Login'))
    }

    render() {
        return(
            <View style={styles.container}>
            <Text style={styles.header}>Mi Perfil Petly</Text>

            <Text style={styles.infoUsuario}>Usuario: {this.state.user.userName}</Text>
            <Text style={styles.infoUsuario}>Email: {this.state.user.email}</Text>
            <Text style={styles.tituloPost}>Posts:</Text>
            <FlatList
                data={this.state.posts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Post
                        id={item.id}
                        data={item.data}
                        navigation={this.props.navigation}
                        style={styles.posteo}
                    />
                )}
            />

            <Pressable onPress={() => this.logout()} style={styles.botonLogout}>
                <Text style={styles.textoBotonLogout}>Cerrar sesión</Text>
            </Pressable>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#faf5eb",
        padding: 20,
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6B4EFF",
        marginBottom: 20,
    },
    infoUsuario: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    tituloPost: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6B4EFF",
        marginTop: 20,
    },
    posteo: {
        width: '100%',
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
    },
    botonLogout: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#6B4EFF",
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
    },
    textoBotonLogout: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default Perfil
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
            <View>
                <Text>Mi Perfil Petly</Text>

                <Text>Usuario: {this.state.user.userName}</Text>
                <Text>Email: {this.state.user.email}</Text>
                <Text>Posts:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Post
                            id={item.id}
                            data={item.data}
                            navigation={this.props.navigation}
                        />
                    )}
                />

                <Pressable onPress={() => this.logout()}>
                    <Text>Cerrar sesión</Text>
                </Pressable>
            </View>
        )
    }
}

export default Perfil
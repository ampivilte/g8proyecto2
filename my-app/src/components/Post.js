import React, { Component } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

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
        .update({ likes: [this.props.data.likes, auth.currentUser.email]})
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
            <View>
                <Text>{this.props.data.owner}</Text>
                <Text>{this.props.data.post}</Text>

                <View>
                    <Text>{this.props.data.likes.lenght}</Text>
                    <Pressable onPress={() => this.state.likeado ? this.sacarLikePost() : this.likePost()}>
                        <Text>{this.state.likeado ?  "❤️" : "🤍"}</Text>
                    </Pressable>

                    <Pressable onPress={() => this.props.navigation.navigate('Comentarios', {id: this.props.id})}>
                        <Text>💬 Comentar</Text>
                    </Pressable>
                </View>
            </View>

        )
    }
}

export default Post
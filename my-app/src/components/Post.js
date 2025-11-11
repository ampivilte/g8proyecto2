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
            <View>
                <Text>{this.props.data.owner}</Text>
                <Text>{this.props.data.post}</Text>

                <View>
                    <Text>{this.props.data.likes.length}</Text>
                    <Pressable onPress={() => this.state.likeado ? this.sacarLikePost() : this.likePost()}>
                        <Text>{this.state.likeado ?  "❤️ Quitar like" : "🤍 Like"}</Text>
                    </Pressable>

                    <Pressable onPress={() => this.props.navigation.navigate('Comentarios', {id: this.props.id})}>
                        <Text>💬 Comentar</Text>
                    </Pressable>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    estilos: {
        
    }
})

export default Post
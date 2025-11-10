import React, { Component } from "react";
import { Text, View, Pressable } from "react-native";
import { TextInput } from "react-native";
import { db } from "../firebase/config";
import { StyleSheet } from "react-native";

export class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: '',
            createdAt: '',
            post:'',
            likes: [],
            error: '',
            mensaje: '',
        }
    }

    subirPost() {
        if(this.state.post === '') {
            this.setState({ error: "Tu post está vacío!"})
        } else {
            db.collection('posts').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                post: this.state.post,
                likes: [],
            })
            .then(() => {
                this.setState({ post: ''})
            })
            .catch(() => {
                this.setState({ error: "Error al publicar tu post."})
            })
        }
    }

    render() {
        return(
            <View>
                <Text>Creá un nuevo post en Petly</Text>
                <View>
                    <TextInput
                        keyboardType="default"
                        placeholder="comentario..."
                        onChangeText={text => this.setState({ post: text})}
                        value={this.state.post}
                    />

                    <Pressable onPress={() => this.subirPost()}>
                        <Text>Publicar</Text>
                    </Pressable>

                    <Text>{this.state.mensaje}</Text>
                    <Text>{this.state.error}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
    } 
})

export default NewPost
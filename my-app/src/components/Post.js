import React, { Component } from "react";
import { Text, View } from "react-native-web";
import { db, auth } from "../firebase/config";
import { Pressable, StyleSheet } from "react-native";

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
        }
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
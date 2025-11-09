import React, { Component } from "react";
import { Text, View } from "react-native-web";
import { db, auth } from "../firebase/config";
import { StyleSheet } from "react-native";

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

            </View>
        )
    }
}
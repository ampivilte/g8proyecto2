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
            <View>
                <Text>Comentarios</Text>
                <Text>{this.state.posteo.post}</Text>

                <View>
                    <TextInput
                        keyboardType="default"
                        placeholder="comentario..."
                        onChangeText={text => this.setState({ post: text })}
                        value={this.state.post}
                    />

                    <Pressable onPress={() => this.subirPost()}>
                        <Text>Publicar comentario</Text>
                    </Pressable>

                    <FlatList
                        data={this.state.posteo.comentarios}
                        keyExtractor={(item) => item.createdAt + item.owner}
                        renderItem={({ item }) => (
                            <Text>{item.post}</Text>
                        )}
                    />

                    <Text>{this.state.error}</Text>
                </View>
            </View>
        )
    }
}

export default Comentarios



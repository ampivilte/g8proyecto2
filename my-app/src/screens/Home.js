import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase/config";
import { Post } from "../components/Post";

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        db.collection('posts')
            .orderBy('createdAt', "desc")
            .onSnapshot((docs) => {
                let arrayPosts = [];
                docs.forEach(doc => arrayPosts.push({ id: doc.id, data: doc.data() }))
                this.setState({ posts: arrayPosts })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Posteos Recientes</Text>
                <Text style={styles.subtitulo}>Home</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Post
                            id={item.id}
                            data={item.data}
                            navigation={this.props.navigation}
                        />
                    )}
                />

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
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#6B4EFF", 
        marginBottom: 5,
    },
    subtitulo: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
    },
});


export default Home
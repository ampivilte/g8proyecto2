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
            docs.forEach(doc => arrayPosts.push({ id: doc.id, data: doc.data()}))
            this.setState({ posts: arrayPosts})
        })
    }

    render() {
        return(
            <View>
                <Text>Home Petly</Text>
                <Text>Posteos Recientes</Text>
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

            </View>
        )
    }
}

export default Home
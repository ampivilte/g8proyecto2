import React, { Component } from 'react';
import { Text, View, Pressable, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export class Home extends Component {
 constructor(props) {
  super(props);
  this.state = {
    posts: [],
  };
 }

 componentDidMount(){
  db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((docs) => {
    let listaPosts = [];
    docs.forEach((doc) => {
      listaPosts.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    this.setState({posts: listaPosts});
  });
 };

likear(post){
  //calculo de likes y modifico firebase
  let cantLikes = post.data.likes !== undefined ? post.data.likes : 0;

  let actualizarValor = post.data.meGusta ? cantLikes -1 : cantLikes +1;

  db.collection("posts")
  .doc(post.id)
  .update({
    likes: actualizarValor,
    meGusta: !post.data.meGusta,
  })
  .then(() => console.log("Like actualizado"))
  .catch(() => console.log("Error al actualizar like"));
}

renderItem({item}){
  const info = item.data;

  //para el nombre del usuario
  let nombreUsuario = info.userName ? info.userName : info.owner ? info.owner : info.email ? info.email : 'Usuario no válido';

  //para el texto del post
  let textoPost = info.texto ? info.texto : info.post ? info.post : info.description ? info.description : 'Post sin texto';

  //mostrar en pantalla el numero de likes
  let cantidadLikes = info.likes !== undefined ? info.likes : 0;

  return(
    <View>
    <Text>Usuario: {nombreUsuario}</Text>
    <Text>Post: {textoPost}</Text>
    <Text>Likes: {cantidadLikes}</Text>

    <Pressable onPress={() => this.darMeGusta(item)}>
      <Text>{info.meGusta ? "Quitar me gusta" : "Me gusta"}</Text>
    </Pressable>

    <Pressable
      onPress={() =>
        this.props.navigation.navigate("Comments", { id: item.id })
      }
    >
      <Text>Comentar</Text>
    </Pressable>
  </View>
  );

};

render() {
    return (
      <View>
        <Text>Página principal</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={(item) => this.renderItem(item)}
        />
      </View>
    );
  }

}

export default Home

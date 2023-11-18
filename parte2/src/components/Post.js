import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import {db, auth} from "../firebase/config"
import { Image } from "react-native";
import firebase from "firebase";


class Post extends Component {
    constructor(props) {
      super(props);
      this.state = {
        like: false
      }
    }
  
    componentDidMount(){

      let likes = this.props.propsDePost.datos.likes
      
      if(likes.length === 0){
        this.setState({
          like: false
        })
      }
      if (likes.length > 0){
        likes.forEach( like => {if (like === auth.currentUser.email){
          this.setState({ like: true})
        }})
      }
  }

  likear(){
    db.collection("posteo").doc(this.props.propsDePost.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(this.setState({like: true}))
  }

  dislikear(){
    db.collection("posteo").doc(this.props.propsDePost.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(this.setState({like: false}))
  }
  
  
    render() {
      console.log(this.props);
      return (
        <View >
                <Text>----------------------------------------------------</Text>
                <Text>Datos del Post</Text>
                <Image style={styles.foto} 
                source={ {uri: this.props.propsDePost.datos.imagen } }/>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('OtroUser', {email: this.props.propsDePost.datos.owner})}>
                  <Text>Email: {this.props.propsDePost.datos.owner}</Text>
                </TouchableOpacity>
                <Text>Descripcion: {this.props.propsDePost.datos.descripcion}</Text>
                <Text>Cantidad de Likes: {this.props.propsDePost.datos.likes.length}</Text>
                {this.state.like ? 
                <TouchableOpacity style={styles.botoncitoDislike} onPress={() => this.dislikear()}>
                  <Text style={styles.boton}> Dislike</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.botoncito} onPress={() => this.likear()}>
                  <Text style={styles.boton}> Like</Text>
                </TouchableOpacity>
                }
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      height: 100,
      width: 200
    },
    foto:{
        height:200,
        width: 200,
    },boton: {
      paddingVertical:6,
      paddingHorizontal: 10,
      borderColor: 'green',
      borderRadius: 40,
      backgroundColor: 'green'
    },
    botoncito: {
        paddingVertical:5,
        paddingHorizontal: 10,
        borderRadius: 40,        
        width:70,
    },botoncitoDislike: {
      paddingVertical:5,
      paddingHorizontal: 10,
      borderRadius: 40,        
      width:90,
  },
  });
  
  export default Post;
  
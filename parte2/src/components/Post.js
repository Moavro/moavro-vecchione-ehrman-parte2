import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import {db, auth} from "../firebase/config"
import { Image } from "react-native";


class Post extends Component {
    constructor(props) {
      super(props);
      this.state = {
        like: false
      }
    }
  
    componentDidMount(){
  }
  
  
    render() {
      console.log(this.props);
      return (
        <View >
                <Text>----------------------------------------------------</Text>
                <Text>Datos del Post</Text>
                <Image style={styles.foto} 
                source={ {uri: this.props.propsDePost.datos.imagen } }/>
                <Text>Email: {this.props.propsDePost.datos.owner}</Text>
                <Text>Descripcion: {this.props.propsDePost.datos.descripcion}</Text>
                <Text>Cantidad de Likes:</Text>
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      height: 100,
    },
    foto:{
        height:200,
        width: 200,
    },
  });
  
  export default Post;
  
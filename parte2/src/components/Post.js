import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import {db, auth} from "../firebase/config"


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
      console.log(this.state.props);
      return (
        <View>
            <Text>Hola</Text>
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      height: '100vh',
    },
  });
  
  export default Post;
  
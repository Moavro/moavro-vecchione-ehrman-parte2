import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, Stylesheet, Flatlist} from "react-native";
import {db, auth} from "../../firebase/config"


class Home extends Component{
    constructor(){
        super();
        this.setState= {
            posts:{}
        }
    }
    componentDidMount(){
        db.collection("posteos").onSnapshot(
            listaPosteos => {
                let mostrados = [];

                listaPosteos.forEach(post => {
                    mostrados.push({
                        id: post.id,
                        datos: post.data()
                    })
                })

                this.setState({
                    posts:mostrados
                })
            }

        )
    }

    logout(){
        auth.signOut();
    }




    render(){
        return(
            <View>
                <Text> Home vecchio globo quemero</Text>
            </View>
        )
    }
}


export default Home;
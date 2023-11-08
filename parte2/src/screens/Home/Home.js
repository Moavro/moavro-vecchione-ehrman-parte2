import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import {db, auth} from "../../firebase/config"


class Home extends Component{
    constructor(){
        super();
        this.setState= {
            posts:[]
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
                <TouchableOpacity style={styles.botoncito} onPress={()=> this.props.navigation.navigate("Posteo")}>
                <Text>Subir posteo</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    form:{paddingHorizontal: 550,
    paddingVertical: 200},
    input:{
        height:50,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: 'green',
        borderRadius: 40,
        marginVertical:10,
        marginHorizontal: 10
    },
    boton: {
        height: 50,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderColor: 'green',
        borderRadius: 40,
        backgroundColor: 'green'
        
    },
    botoncito: {
        height: 30,
        paddingVertical:5,
        paddingHorizontal: 10,
        borderRadius: 40,        
    },
    error: {
        height: 30,
        paddingVertical:5,
        paddingHorizontal: 10,
        borderRadius: 40, 
        color: "red"    
    }
})

export default Home;
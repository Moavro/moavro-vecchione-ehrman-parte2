import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from "react-native";
import {db, auth} from "../../firebase/config"
import Post from "../../components/Post";

class Home extends Component{
    constructor(){
        super();
        this.state= {
            posts:[]
        }
    }
    componentDidMount(){
        db.collection("posteo").orderBy("createdAt","desc").onSnapshot(
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






    render(){
        console.log(this.state.posts);
        return(
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text>Posteos</Text>
                    {
                        this.state.posts.length === 0 
                        ?
                        <Text>Cargando...</Text>
                        :
                        <FlatList 
                            data= {this.state.posts}
                            keyExtractor={ post => post.id }
                            renderItem={ ({item}) => <Post navigation= {this.props.navigation} propsDePost = { item } /> }
                        />
                    }
                    <TouchableOpacity style={styles.botoncito} onPress={()=> this.props.navigation.navigate("Posteo")}>
                    <Text style={styles.botoncito}>Subir posteo</Text>
                    </TouchableOpacity> 
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    form:{paddingHorizontal: 550,
    paddingVertical: 200},
    scrollView: {
        flex: 1,
      },
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
        width:100       
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
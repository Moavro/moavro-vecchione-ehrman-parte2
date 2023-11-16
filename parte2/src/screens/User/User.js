import React, { Component } from "react";
import {TextInput, TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, FlatList} from "react-native";
import {db, auth} from "../../firebase/config"


class User extends Component{
    constructor(){
        super();
        this.state= {
            datos:[],
            posts: []
        };
    }

    componentDidMount(){
        db.collection("usuarios").where("owner", "==", auth.currentUser.email). onSnapshot(
            docs => {
                let user = []
                docs.forEach (doc => {
                    user.push({
                        id: doc.id,
                        data:doc.data()
                    })
                })
                this.setState({
                    datos: user,
                })
            }
        )
        
        db.collection("posteo").where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let info = []
                docs.forEach (doc => {
                    info.push({
                        id: doc.id,
                        data:doc.data()
                    })
                })
                this.setState({
                    posts: info
                })
            }
        )


    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate("Login")
    }
    
    render(){
        console.log(auth.currentUser.email)
        console.log(this.state.posts)
        console.log(this.state.datos)
        return(
          <View>
                <FlatList
                    data= {this.state.datos}
                    keyExtractor={(item) => item.id}
                    renderItem={ ({item}) => (
                        <Text> {item.data.userName}</Text>

                    )}
                />
                <Text> User</Text>
                <TouchableOpacity style={styles.botoncito} onPress={()=> this.logout() }>
                    <Text>Logout</Text>
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

export default User; 
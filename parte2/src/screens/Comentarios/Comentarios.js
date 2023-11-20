import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from "react-native";
import {db, auth} from "../../firebase/config"
import Post from "../../components/Post";
import firebase from 'firebase'

class Comentarios extends Component{
    constructor(props){
        super(props);
        this.state= {
            comentarioNuevo: "", 
            id:"",
            info:[]
        }
    }
    componentDidMount(){
        
        db.collection("posteo").doc(this.props.route.params.id).onSnapshot(
            doc => {
                this.setState({
                    id: doc.id,
                    info: doc.data(),
                }), 
                console.log("State info:", this.state.info);
                console.log(this.state.id);
            })
        
    }
    agregarComentario(id, texto){
        db.collection("posteo").doc(id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: texto
            })
        })
    }

    render(){
        console.log(this.state.info)
        return(
            <ScrollView style={styles.scrollView}>
                <View>
                     { <FlatList 
                        data= {this.state.info.comentarios}
                        keyExtractor={ item => item.createdAt.toString()}
                        renderItem={ ({item}) => <View> 
                            <Text> {item.owner} comentó:</Text>
                            <Text> {item.comentario} </Text>
                            </View>
                            }
                    /> } 
                    <TextInput
                        onChangeText={text => this.setState({comentarioNuevo: text})}
                        style = {styles.input}
                        keyboardType='default'
                        placeholder='Agregar un comentario'
                        value={this.state.comentarioNuevo}
                    />
                    <TouchableOpacity style ={styles.boton} onPress={()=> this.agregarComentario(this.state.id,this.state.comentarioNuevo)}>
                    <Text> Subir comentario</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style ={styles.botoncito} onPress={() => this.props.navigation.navigate('Menu',)}>
                        <Text>Volver a Home</Text>
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

export default Comentarios;
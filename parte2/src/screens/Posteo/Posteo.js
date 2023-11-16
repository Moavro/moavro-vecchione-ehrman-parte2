import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import {db, auth} from "../../firebase/config"
import Camara from "../../components/Camara";


class Posteo extends Component{
    constructor(){
        super();
        this.state= {
            post: '',
            descripcion:'',
            url: '',
            showCamera: true

        }
    }

    posteo(foto, texto){
        //console.log(foto, descripcion)
        db.collection('posteo').add({
            owner: auth.currentUser.email,
            imagen: foto,
            descripcion: texto,
            likes:[],
            createdAt: Date.now(),
        })
        .then()
        .catch(e => console.log(e))
    }

    onImageUpload(url){
        this.setState({showCamera: false,
        url: url})
    }


    render(){
        return(
            <View style={styles.form}>
                <Text >Posteo</Text>
                <TextInput 
                style={styles.input}
                placeholder='Descripcion'
                keyboardType='default'
                onChangeText={text => this.setState({foto:text})}/>
                <Camara onImageUpload = {(url) => this.onImageUpload(url)}/>
                <TouchableOpacity style={styles.boton} onPress={()=> this.posteo(this.state.url, this.state.descripcion)}>
                    <Text>Subir foto</Text>
                </TouchableOpacity>             
            </View>
        )
    }
}
const styles = StyleSheet.create({
    form:{paddingHorizontal: 550,
    paddingVertical: 20,},
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: 'green',
        borderRadius: 40,
        marginVertical:10,
        marginHorizontal: 10
    },
    boton: {
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
    },
    error: {
        height: 30,
        paddingVertical:5,
        paddingHorizontal: 10,
        borderRadius: 40, 
        color: "red"    
    }
})

export default Posteo;
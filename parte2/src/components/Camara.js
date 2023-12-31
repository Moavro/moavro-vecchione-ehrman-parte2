import React, { Component } from "react";
import {Camera} from "expo-camera"
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import { Image } from "react-native";
import {db, auth, storage} from "../firebase/config"

class Camara extends Component{

    constructor(props){
        super(props);
        this.state = {
            permisos : false, photo: "", showCamera: true,
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync(
        )
        .then( ()=> {
            this.setState({
                permisos: true
            })
        })
        .catch( e => console.log(e))
    }
    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(photo=> {
            this.setState({
                photo: photo.uri,
                showCamera: false
            })
        }
            
        ) 
    }

    rechazarFoto(){
        this.setState({
            showCamera: true,
        })
    }
    aceptarFoto(){
        fetch(this.state.photo)
        .then(res => res.blob())
        .then( image=> {
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then(url => {
                    this.props.onImageUpload(url);
                })
            })
        })
        .catch(e => console.log(e))
    }
    render(){
        return(
            <View style = {styles.vista}>
                {this.state.showCamera == true ? 
                <React.Fragment><Camera 
                style={styles.camara}
                type={Camera.Constants.Type.front}
                ref={metodosDeCamara => this.metodosDeCamara= metodosDeCamara}
                />
                <TouchableOpacity 
                    style={styles.botoncito} onPress={()=> this.sacarFoto()}>
                    <Text>Sacar foto</Text>
                </TouchableOpacity></React.Fragment> : 
                <View >
                <Image style={styles.preview}
                source={ {uri: this.state.photo} }/>
                
                    <TouchableOpacity style={styles.botoncito} onPress={()=> this.aceptarFoto()}>
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botoncito} onPress={()=> this.rechazarFoto()}>
                        <Text>Rechazar</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    form:{/* paddingHorizontal: 550,
    paddingVertical: 200, */
    height: `60vh`,
    widht: `100vw`,},
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
        height: 50 ,
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
    },
    camara: {
        height:"100%",
        width: "100%",
    },
    preview:{
        height:200,
        width: 200,
    },
    vista:{
        height: "60vh" ,
        width: "30vw" ,
    }
})

export default Camara

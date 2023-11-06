import React from "react";
import {Camera} from "expo-camera"
import { touchProps } from "react-native-web/dist/cjs/modules/forwardedProps";

class Camara extends component{

    constructor(props){
        super(props);
        this.state = {
            permisos : false, photo: "", showCamera: true
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync(
        )
        .then(res => {
            if (res.granted=== true){
                this.setState({permisos:true})
            }

        })
        .catch( e => console.log(e))
    }
    sacarFoto(){

        this.metodoCamara.takePictureAsync()
        .then( 
            
        ) 
    }

    rechazarFoto(){
        this.setState({
            showCamera: true,
        })
    }
    aceptarFoto(){
        fetch(this.state-photo)
        .then(res => res.blob())
        .then( image=> {
            const ref = storage.ref()
        })
    }
    render(){
        return(
            <>
                {this.state.permisos 

                }
            </>
        )
    }
}
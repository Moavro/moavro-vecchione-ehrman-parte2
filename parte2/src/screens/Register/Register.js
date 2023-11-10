import react, { Component } from 'react';
import { auth, db } from "../../firebase/config"
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';


class Register extends Component{
    constructor(){
        super()
            this.state={
                email: '',
                password: '',
                userName: '',
                registrado: false,
                mensaje: '',
                miniBio:'',

            }
        
    }

    register(email, pass, userName){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                db.collection("usuarios").add ({
                    owner:auth.currentUser.email,
                    userName: userName,
                    miniBio: miniBio,
                    createdAt: Date.now(),
                })
                .then(res=> console.log(res),
                this.props.navigation.navigate("Login"))
            })     
            .catch( error => {
                console.log(error),
                this.setState({
                    mensaje: error.message
                })
                })
        }

    


    render(){
        return(
            <View style={styles.form}>
                <Text >Register</Text>
                <TextInput 
                style={styles.input}
                placeholder='email'
                keyboardType='email-address'
                onChangeText={text => this.setState({email:text})}
                value={this.state.email}/>
                <TextInput
                style={styles.input}
                placeholder='password'
                keyboardType='default'
                secureTextEntry={true}
                onChangeText={text => this.setState({password:text})}
                value={this.state.password}/>
                <TextInput
                style={styles.input}
                placeholder='username'
                keyboardType='default'
                onChangeText={text => this.setState({userName:text})}
                value={this.state.username}/>
                <TextInput
                style={styles.input}
                placeholder='minibio'
                keyboardType='default'
                onChangeText={text => this.setState({miniBio:text})}
                value={this.state.miniBio}/>
                {this.state.userName.length <= 4 && this.state.password.length <=4 && this.state.email.length <= 4 ? <Text> </Text> : <TouchableOpacity style={styles.boton} onPress={()=> this.register( this.state.email, this.state.password, this.state.userName, this.state.miniBio)}>
                    <Text>Registrarse</Text>
                </TouchableOpacity>}
                 <TouchableOpacity style={styles.botoncito} onPress={()=> this.props.navigation.navigate("Login")}>
                    <Text>Ya tengo una cuenta</Text>
                </TouchableOpacity>   
                <Text style={styles.error}> 
                    {this.state.mensaje}
                </Text>            
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
        height: 50,
        paddingVertical:15,
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

export default Register


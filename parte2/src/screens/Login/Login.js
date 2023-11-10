import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component{
    constructor(){
        super()
            this.state={
                email: '',
                password: '',
                userName: '',
                registrado: false,
                mensajeError: ""

            }
        
    }

    login(email, pass){

        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                console.log("Logeado papu", res)
                this.props.navigation.navigate("Menu")
            })     
            .catch( error => {
                console.log(error)
                this.setState({
                    mensajeError: "Las credenciales son invalidas"
                })
                })
        }

    render(){
        return(
            <View style={styles.form}>
                <Text >Login</Text>
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
                <TouchableOpacity style={styles.botoncito} onPress={()=> this.props.navigation.navigate("Register")}>
                    <Text>No tengo cuenta</Text>
                </TouchableOpacity>
                {this.state.userName <4 & this.state.password <4 ? <Text> </Text> : <TouchableOpacity style={styles.boton} onPress={()=> this.login( this.state.email, this.state.password)}>
                    <Text>Iniciar sesion</Text>
                </TouchableOpacity>}
              
                <Text style={styles.error}> 
                    {this.state.mensajeError}
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

export default Login

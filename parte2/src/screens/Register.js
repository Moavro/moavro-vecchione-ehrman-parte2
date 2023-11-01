import react, { Component } from 'react';
import { auth, db } from "../firebase/config"
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';


class Register extends Component{
    constructor(){
        super()
            this.state={
                email: '',
                password: '',
                userName: '',
                registrado: false

            }
        
    }

    register(email, pass, userName){
        auth.createUserWithEmailAndPassword(email, pass)
    .then( response => {
        this.setState({registrado: true});
        console.log("registrado", response);
     })     
    .catch( error => {
      this.setState({error: 'Fallo en el registro.'})
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
                <TouchableOpacity style={styles.boton} onPress={()=> this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text>Registrarse</Text>

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
        
    }
})

export default Register


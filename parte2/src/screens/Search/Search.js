import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from "../../firebase/config"

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            users:[],
            usuarioABuscar:""
        }
    }

    buscarUser(texto){
        db.collection("usuarios").onSnapshot(
            docs => {
                let usuario= []
                docs.forEach(doc => {
                    const userInfo = doc.data();
                    if (userInfo.userName.includes(texto)){
                        usuario.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                })
                this.setState({
                    usuarioABuscar: texto,
                    users: usuario,
                })
            }
        )
    }
    onChange(event) {
        event.preventDefault()
        this.buscarUser(event.target.value)
    }

    render() {
        return (
            <ScrollView style={style.scrollView}>
                <View style={style.container}>
                    <TextInput style={style.input}
                    
                        placeholder='Search'
                        keyboardType='default'
                        onChange={(event) => this.onChange(event)}
                        value={this.state.usuarioABuscar}
                    />
                    { this.state.usuarioABuscar !== '' ? (
                    <>
                            {this.state.users.length === 0 ?
                                <Text style={style.error}>No hay usuarios con ese nombre</Text> :
                                <FlatList
                                    data={this.state.users}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item }) =>
                                        <Text style={style.input} onPress={() => this.props.navigation.navigate('OtroUser', { email: item.data.owner })}>{item.data.userName} </Text>
                                    }
                                />
                            }
                    </>
                    ) : null}
                </View>
            </ScrollView>
        )
    }

}
const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        padding: 15,
      },
    input: {
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 40,
        marginVertical: 10,
        margin: 10,
        padding:10 
      },

    error: {
        height: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 40,
        color: "red",
      },
});

export default Search 
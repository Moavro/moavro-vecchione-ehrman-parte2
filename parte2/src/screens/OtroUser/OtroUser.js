import React, { Component } from "react";
import {TextInput, TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, FlatList, Image, ScrollView} from "react-native";
import {db, auth} from "../../firebase/config"
import Post from "../../components/Post"
import firebase from "firebase";
import { FontAwesome } from '@expo/vector-icons';

class OtroUser extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            userName: '',
            fotoPerfil: '',
            miniBio: '',
            userId: '',
            currentPassword: '',
            newPassword: '',
            err: ''
        }
    }

    componentDidMount() {
        this.getUserInfo();
        this.getposts();
    }

    getUserInfo() {
        db.collection('usuarios').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    const user = doc.data();
                    this.setState({
                        userId: doc.id,
                        userName: user.userName,
                        email: user.owner,
                        miniBio: user.miniBio,
                        fotoPerfil: user.fotoPerfil
                    })
                });
            }
        )
    }

    getposts() {
        db.collection('posteo').where('owner', '==', this.props.route.params.email).orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let mostrados = [];
                docs.forEach(doc => {
                    mostrados.push({
                        id: doc.id,
                        datos: doc.data()
                    })
                    console.log(('posts:', mostrados))
                    this.setState({
                        posts: mostrados
                    })
                })
            }
        )
    }
    


    render() {
        return (
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.leftColumn}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Menu")}>
                  <FontAwesome style={styles.flecha} name="arrow-left" size='large'/>
              </TouchableOpacity>
              <Image style={styles.foto} 
                source={this.state.fotoPerfil ? { uri: this.state.fotoPerfil } : null}/>
    
                <View style={styles.datos}>
                    <Text style={styles.titulo}> Mi perfil:</Text>
                  <Text style={styles.textoDestacado}> Usuario: {this.state.userName}</Text>
                  <Text style={styles.textoDestacado}> Mail: {this.state.email}</Text>
                  <Text style={styles.textoDestacado}>
                    Cantidad de posteos: {this.state.posts.length}
                  </Text>
                  <Text style={styles.textoDestacado}>Biografia: {this.state.miniBio}</Text>
                </View>
                <Text>Posteos</Text>
                 {this.state.posts.length === 0 ? (
                <Text>No hay posts</Text>
                    ) : (
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(post) => post.id}
                            renderItem={({ item }) => {
                                console.log(item); 
                                return <Post navigation={this.props.navigation} propsDePost={item} />;
                            }}
                        />
                    )} 
              </View>
            </View>
          </ScrollView>
        );
      }
    }
    
    const styles = StyleSheet.create({
      scrollView: {
        flex: 1,
      },
      container: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
      },
      leftColumn: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      rightColumn: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      fotopp: {
        height: 150,
        width: 150,
        borderRadius: 75,
      },
      datos: {
        marginLeft: 20,
      },
      titulo:{
        color: "green",
        fontSize: 23,
        marginBottom: 5,
      },
      textoDestacado: {
        color: "black",
        fontSize: 18,
        marginBottom: 5,
      },
      form: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: "white",
        width: "80%", 
      },
      input: {
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 40,
        marginVertical: 10,
      },
      boton: {
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: "green",
        borderRadius: 40,
        backgroundColor: "green",
        textAlign: "center",
        color: "white",
      },
      error: {
        height: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 40,
        color: "red",
      },foto:{
        height:200,
        width: 200,
      },
    });
    
    export default OtroUser;
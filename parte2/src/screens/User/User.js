import React, { Component } from "react";
import {TextInput, TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, FlatList, Image, ScrollView} from "react-native";
import {db, auth} from "../../firebase/config"
import Post from "../../components/Post"

class User extends Component {
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
        db.collection('usuarios').where('owner', '==', auth.currentUser.email).onSnapshot(
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
        db.collection('posteo').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let mostrados = [];
                docs.forEach(doc => {
                    mostrados.push({
                        id: doc.id,
                        datos: doc.data()
                    })
                    this.setState({
                        posts: mostrados
                    })
                })
            }
        )
    }
    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate("Login"))
    }
    updateProfileInfo() {
        db.collection('usuarios')
            .doc(this.state.userId) //identificar el documento
            .update({
                userName: this.state.userName,
                miniBio: this.state.miniBio,
            })
            .then(
                this.getUserInfo()
            )
            .catch(e => console.log(e))
    }

    editProfile() {
        if (this.state.newPassword !== '') {
            auth.signInWithEmailAndPassword(auth.currentUser.email, this.state.currentPassword)
                .then(res => {
                    const user = auth.currentUser;

                    return user.updatePassword(this.state.newPassword)
                        .then(res => {
                            this.updateProfileInfo();
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => this.setState({
                    err: err.message
                }))

        } else {
            this.updateProfileInfo();
        }

    }
    eliminarPost = (postId) => {
      db.collection('posteo').doc(postId).delete()
        .then(() => {
          console.log("Post eliminado");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    eliminarUser(){
      console.log("En deleteAccount")
    
      auth.currentUser.delete()
          .then(() => {
            this.props.navigation.navigate('Register', {navigation: this.props.navigation.navigate })
           }).catch((error) => {
              console.log(error)
            })
          }


    render() {
      console.log(this.state.fotoPerfil,)
        return (
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.leftColumn}>
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
                  <TouchableOpacity  onPress={() => this.eliminarUser()}>
                    <Text style={styles.error}>Delete account</Text>
                  </TouchableOpacity>
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
                        return (
                          <View>
                            <Post navigation={this.props.navigation} propsDePost={item} />
                            <TouchableOpacity onPress={() => this.eliminarPost(item.id)}>
                              <Text style={styles.error}>Eliminar Post</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  )}
                </View>
      
    
              <View style={styles.rightColumn}>
                <View style={styles.form}>
                  <Text>Ingresa los datos que quieras editar</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu nuevo nombre de usuario"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ userName: text })}
                    value={this.state.userName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu nueva biografia"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ miniBio: text })}
                    value={this.state.miniBio}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu actual contraseña"
                    keyboardType="default"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ currentPassword: text })}
                    value={this.state.currentPassword}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu nueva contraseña"
                    keyboardType="default"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ newPassword: text })}
                    value={this.state.newPassword}
                  />
                  <Text>{this.state.err}</Text>
                  <TouchableOpacity onPress={() => this.editProfile()}>
                    <Text style={styles.boton}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.logout()}>
                    <Text style={styles.error}>Log out</Text>
                  </TouchableOpacity>
                </View>
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
        padding: 20,
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
      fotoperfil: {
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
    
    export default User;
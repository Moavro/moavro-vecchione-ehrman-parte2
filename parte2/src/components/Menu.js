import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {db, auth} from "../firebase/config"
import Home from "../screens/Home/Home";
import Posteo from "../screens/Posteo/Posteo";
import User from "../screens/User/User";
import OtroUser from "../screens/OtroUser/OtroUser"

const Tab = createBottomTabNavigator()



class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

 
    render(){
        return(
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Posteo" component={Posteo}/>
                    <Tab.Screen name="User" component={User}/>
                </Tab.Navigator>
        )
    }
}

export default Menu

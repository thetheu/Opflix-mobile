import React, { Component } from 'react';
import { Text, View, AsyncStorage, StyleSheet, Image } from 'react-native';

import jwtDecode from "jwt-decode"

class Profile extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
        <Image
        source={require('../assets/img/users.png')}
        style={styles.tabBarNavigatorIcon}
    />    
    )
};

    constructor() {
        super();
        this.state = {
            usuarios: [],
        }
    }

    componentDidMount() {
        this._recuperarUsuario();
    }

    _recuperarUsuario = async () => {
        let token = await AsyncStorage.getItem('@opflix:token');
        let decoded = jwtDecode(token);
        console.warn(decoded)
        if (decoded !== null) {
            this.setState({ usuarios: decoded })
        } else {
            console.warn('tá nulo')
        }
    }

    render() {
        return (
            <View>
                <Image source={{ uri: this.state.usuarios.Foto}} style={styles.foto}/>
                <Text>{this.state.usuarios.email}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tabBarNavigatorIcon: {
        width: 30,
        height: 30,
        tintColor: "#db3a2e"
    },
    foto: {
        width: 150,
        height: 150
    },
})

export default Profile;
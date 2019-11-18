import React, {Fragment, Component} from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

class SignIn extends Component{

    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.state = {
            email: "",
            senha: ""
        };
    }

    _realizarLogin = async () => {
        await fetch('http://192.168.3.60:5000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            }),
        })
        .then(resposta => resposta.json())
        .then(data => this._home(data.token))
        .catch(erro => console.warn('erro>',erro));
    }

    _home = async (tokenRecebido) => {
        if(tokenRecebido != null) {
            try {
                await AsyncStorage.setItem('@opflix:token', tokenRecebido);
                this.props.navigation.navigate('MainNavigator')
            } catch (error) {
                console.warn('erro>kjfghjkl',error)
            }
        }
    };

    render() {
        return(
            <View style={styles.fundo}>
                
            <View>
                <Text style={styles.text}>OPFLIX</Text>
                <TextInput
                placeholderTextColor="gray"
                placeholder="email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                style={styles.email}
                />
                <TextInput
                placeholderTextColor="gray"
                placeholder="senha"
                onChangeText={senha => this.setState({ senha })}
                value={this.state.senha}
                style={styles.senha}
                />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text style={styles.botao}>Logar</Text>
                </TouchableOpacity>
            </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    fundo:{
        backgroundColor: 'black',
        height: "100%"
    },
    text:{
        color: "red",
        fontSize: 40,
        textAlign: "center",
        marginTop: 50,
    },
    email:{
        textAlign: "center",
        fontSize: 20,
        marginLeft: 55,
        marginTop: 150,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        width: 300,
        height: 40,
        color: 'white',
        
    },
    senha:{
        fontSize: 20,
        textAlign: "center",
        marginLeft: 55,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        width: 300,
        height: 40,
        color: 'white'

    },
    botao:{
        textAlign: "center",
        marginTop: 70,
        fontSize: 17,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        width: 200,
        marginLeft: 105,
        color: 'white'

    }
})

export default SignIn;
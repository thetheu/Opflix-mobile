import React, {Fragment, Component} from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableOpacity} from 'react-native';

class SignIn extends Component{

    static navigationOption = {
        header: null,
    }

    constructor() {
        super();
        this.state = {
            email: "erik@email.com",
            senha: "123456"
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
            <View>
                <TextInput
                placeholder="email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                />
                <TextInput 
                placeholder="senha"
                onChangeText={senha => this.setState({ senha })}
                value={this.state.senha}
                />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Logar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SignIn;
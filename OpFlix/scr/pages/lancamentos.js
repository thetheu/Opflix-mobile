import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Lancamentos extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(){
        super();
        this.state = {
            lancamentos: []
        }
    }

    componentDidMount(){
        this._listarLancamentos();
    }

    _listarLancamentos = async () => {
        await fetch('http://192.168.3.60:5000/api/filmeSeries', {
            headers: {
                'Authorization' : 'bearer' + await AsyncStorage.getItem('@opflix:token')
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ lancamentos: data}))
        .catch(erro => console.warn(erro))
    }

    render() {
        return (
            <View>
                <FlatList
                data = {this.state.lancamentos}
                keyExtractor = {item => item.idFs}
                renderItem = {({item}) => (
                    <View>
                        <Text>{item.titulo}</Text>
                    </View>
                )}
                />
            </View>
        )
    }
}

export default Lancamentos;
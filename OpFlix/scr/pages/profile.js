import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Profile extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            lancamentos: []
        }
    }

    componentDidMount() {
        this._listarLancamentos();
    }

    _listarLancamentos = async () => {
        await fetch('http://192.168.3.60:5000/api/filmeSeries', {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn(erro, 'asdwasdw'))
    }

    render() {
        return (
            <View>
                <Text>Oi</Text>
                <FlatList
                    data={this.state.lancamentos}
                    keyExtractor={item => item.idFs}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ color: 'black' }}>{item.titulo}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}

export default Profile;
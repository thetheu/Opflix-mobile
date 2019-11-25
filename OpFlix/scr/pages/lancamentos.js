import React, { Component } from 'react';
import { Text, View, Picker, AsyncStorage, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Lancamentos extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            lancamentos: [],
            novaLista: [],
            valorSelecionado: 0,
            categorias: [],
        }
    }

    componentDidMount() {
        this._listarLancamentos();
        this._trazerCategorias();
    }

    _listarLancamentos = async () => {
        await fetch('http://192.168.3.60:5000/api/filmeSeries', {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn(erro))
    }

    _trazerCategorias = async () => {
        await fetch("http://192.168.3.60:5000/api/categoria", {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token'),
                'Content-Type': 'application/json',
            }
        })
            .then(x => x.json())
            .then(response => {
                this.setState({ categorias: response })
            })
            .catch(erro => console.log(erro))
    }

    alterarValor = (valor) => {
        this.setState({ valorSelecionado: valor })
        // if (valor == 0) {
        //     this.setState({ novaLista: [] })
        // }

        this.setState({ novaLista: this.state.lancamentos.filter(x => x.idCategoria == valor) })

        // console.warn(this.state.lancamentos.filter(x => x.idCategoria == valor))
    }

    render() {
        return (
            <View>
                {/* <Text>{this.state.valorSelecionado}</Text> */}
                <View>
                    <Picker style={styles.selecione} selectedValue={this.state.valorSelecionado} onValueChange={this.alterarValor}>
                        <Picker.Item label="Selecione uma Categoria" value="0"/>
                        {this.state.categorias.map(item => {
                            return (
                                <Picker.Item label={item.nome} value={item.idCategoria} />
                            )
                        })}
                    </Picker>
                    <View style={{ height: 1, backgroundColor: 'black'}}></View>
                </View>
                <View>
                    {/* <FlatList
                        data={this.state.lancamentos}
                        keyExtractor={item => item.idFs}
                        renderItem={({ item }) => (
                            <View>
                                <Text >{item.titulo}</Text>
                                <Text >{item.sinopse}</Text>
                            </View>
                        )}
                    /> */}

                    <Text style={styles.Lanca}>Lançamentos</Text>

                    {this.state.valorSelecionado == 0 ? <FlatList
                        data={this.state.lancamentos}
                        keyExtractor={item => item.idFs}
                        ListEmptyComponent={<Text>Não há itens</Text>}
                        renderItem={({ item }) => (
                            <View>
                                <View style={{height: 1, backgroundColor: "black", marginLeft: 15, marginRight: 15}}></View>
                                <Text style={styles.titulo} >{item.titulo}</Text>
                                <Text style={styles.sinopse}>{item.sinopse}</Text>
                            </View>
                        )}
                    /> :
                        <FlatList
                            data={this.state.novaLista}
                            keyExtractor={item => item.idFs}
                            ListEmptyComponent={<Text>Não há itens</Text>}
                            renderItem={({ item }) => (
                                <View>
                                    <Text >{item.titulo}</Text>
                                    <Text >{item.sinopse}</Text>
                                </View>
                            )}
                        />}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 5
    },
    sinopse: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: "center",
        marginLeft: 15,
        marginRight: 15,

    },
    Lanca: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 50
    },
    selecione: {
        textAlign: "center",        
    },
})

export default Lancamentos;

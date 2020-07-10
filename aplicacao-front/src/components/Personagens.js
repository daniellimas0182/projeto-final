import React from 'react'
import Axios from 'axios'
import PersonagensForm from './PersonagensForm'
import { Table, TableHead, TableBody, TableCell, TableRow, Button } from '@material-ui/core'

export default class Personagens extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            personagens: [],
            mundos: [],
            classes: [],
            itens: [],
            usuarios: [],
            selecionado: null
        }
        this.handleGetMundo();
        this.handleGetClasse();
        this.handleGetItem();
    }

    componentDidMount = () => {
        this.handleGet()
    }

    handleGetMundo = () => {
        const url = 'http://localhost:9000/mundos'
        var request = Axios.get(url)

        request.then((response) => {
            console.log("Tou aqui")
            console.log(response.data)
        

            this.setState({
                mundos: [...response.data]
            })

        })
    }

    handleGetClasse = () => {
        const url = 'http://localhost:9000/classes'
        var request = Axios.get(url)

        request.then((response) => {
            console.log("Tou aqui")
            console.log(response.data)
        

            this.setState({
                classes: [...response.data]
            })

        })
    }

    handleGetItem = () => {
        const url = 'http://localhost:9000/itens'
        var request = Axios.get(url)

        request.then((response) => {
            console.log("Tou aqui")
            console.log(response.data)
        

            this.setState({
                itens: [...response.data]
            })

        })
    }

    handleGetUsuario = () => {
        const url = 'http://localhost:9000/usuario'
        var request = Axios.get(url)

        request.then((response) => {
            console.log("Tou aqui")
            console.log(response.data)
        

            this.setState({
                usuarios: [...response.data]
            })

        })
    }



    handleGet = () => {
        const url = 'http://localhost:9000/personagens'
        var request = Axios.get(url)

        request.then((response) => {
            console.log("personagensss");
            console.log(response.data);
            this.setState({
                personagens: response.data
            })

        })
    }

    handleSubmit = (personagem) => {
        if (this.state.selecionado == null) {
            this.handlePost(personagem)
        } else {
            this.handlePut(this.state.selecionado, personagem)
        }
    }

    handlePost = (personagem) => {
        const url = 'http://localhost:9000/personagens'
        var request = Axios.post(url, personagem)

        request.then((response) => {
            this.handleGet()
        })
    }

    handlePut = (_id, personagem) => {

        this.setState({
            selecionado: null
        })

        const url = 'http://localhost:9000/personagens/' + _id
        var request = Axios.put(url, personagem)

        request.then((response) => {
            this.handleGet()
        })
    }

    handleDelete = (_id) => {
        console.log("deletar" + _id)

        const url = 'http://localhost:9000/personagens/' + _id
        var request = Axios.delete(url)

        request.then((response) => {
            this.handleGet()

        })
    }

    handleSelect = (_id) => {
        console.log("Sele" + _id)
        this.setState({
            selecionado: _id
        })
    }


    render() {
        var listaPersonagens = this.state.personagens.map((item, _id) => {
            return <TableRow key={item._id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.cor_cabelo}</TableCell>
                <TableCell>{item.altura}</TableCell>
                <Button onClick={() => this.handleDelete(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Deletar</Button>
                <Button onClick={() => this.handleSelect(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Selecionar</Button>
            </TableRow>
        })

        return (
            <Table style={{ margin: '1.5rem' }}>
                <TableHead>
                    <TableRow>
                        <h1>Cadastro de Personagens</h1>
                    </TableRow>
                    <PersonagensForm handlePost={this.handleSubmit} mundos={this.state.mundos} classes={this.state.classes} itens={this.state.itens}></PersonagensForm>
                </TableHead>
                <TableHead>
                    <h1>Lista de Personagens</h1>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Cor do cabelo</TableCell>
                        <TableCell>Altura</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listaPersonagens}
                </TableBody>
            </Table>
        )
    }

}
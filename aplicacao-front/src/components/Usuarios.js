import React from 'react'
import Axios from 'axios'
import UsuariosForm from './UsuariosForm'
import { Table, TableHead, TableBody, TableCell, TableRow, Button } from '@material-ui/core'


export default class Usuarios extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            usuarios: [],
            selecionado: null
        }

    }

    componentDidMount = () => {
        this.handleGet()
    }


    handleGet = () => {
        const url = 'http://localhost:9000/usuarios'
        var request = Axios.get(url)

        request.then((response) => {
            console.log(response.data)

            this.setState({
                usuarios: response.data
            })

        })
    }

    handleSubmit = (usuario) => {
        if (this.state.selecionado == null) {
            this.handlePost(usuario)
        } else {
            this.handlePut(this.state.selecionado, usuario)
        }

    }

    handlePost = (usuario) => {
        const url = 'http://localhost:9000/usuarios'
        var request = Axios.post(url, usuario)

        request.then((response) => {
            this.handleGet()
        })

    }

    handlePut = (_id, usuario) => {

        this.setState({
            selecionado: null
        })

        const url = 'http://localhost:9000/usuarios/' + _id
        var request = Axios.put(url, usuario)

        request.then((response) => {
            this.handleGet()
        })

    }

    handleDelete = (_id) => {
        console.log("deletar" + _id)

        const url = 'http://localhost:9000/usuarios/' + _id
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

        var listaUsuarios = this.state.usuarios.map((item, _id) => {
            return <TableRow key={item._id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>({item.senha})</TableCell>
                <Button onClick={() => this.handleDelete(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Deletar</Button>
                <Button onClick={() => this.handleSelect(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Selecionar</Button>
            </TableRow>
        })

        return (
            <Table style={{ margin: '1.5rem' }}>
                <TableHead>
                    <TableRow>
                        <h1>Cadastro de Usuários</h1>
                    </TableRow>
                    <UsuariosForm handlePost={this.handleSubmit}></UsuariosForm>
                </TableHead>
                <TableHead>
                    <h1>Lista de Usuários</h1>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Senha</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listaUsuarios}
                </TableBody>
            </Table>
        )
    }
}
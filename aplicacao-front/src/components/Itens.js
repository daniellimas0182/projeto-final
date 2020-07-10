import React from 'react'
import Axios from 'axios'
import ItensForm from './ItensForm'
import { Table, TableHead, TableBody, TableCell, TableRow, Button } from '@material-ui/core'

export default class Itens extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            itens: [],
            selecionado: null
        }

    }

    componentDidMount = () => {
        this.handleGet()
    }

    handleGet = () => {
        const url = 'http://localhost:9000/itens'
        var request = Axios.get(url)

        request.then((response) => {
            console.log(response.data)

            this.setState({
                itens: response.data
            })

        })
    }

    handleSubmit = (item) => {
        if (this.state.selecionado == null) {
            this.handlePost(item)
        } else {
            this.handlePut(this.state.selecionado, item)
        }

    }

    handlePost = (item) => {
        const url = 'http://localhost:9000/itens'
        var request = Axios.post(url, item)

        request.then((response) => {
            this.handleGet()
        })

    }

    handlePut = (_id, item) => {

        this.setState({
            selecionado: null
        })

        const url = 'http://localhost:9000/itens/' + _id
        var request = Axios.put(url, item)

        request.then((response) => {
            this.handleGet()
        })

    }

    handleDelete = (_id) => {
        console.log("deletar" + _id)

        const url = 'http://localhost:9000/itens/' + _id
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

        var listaItens = this.state.itens.map((item, _id) => {
            return <TableRow key={item._id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>({item.dano})</TableCell>
                <Button onClick={() => this.handleDelete(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Deletar</Button>
                <Button onClick={() => this.handleSelect(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Selecionar</Button>
            </TableRow>
        })

        return (

            <Table style={{ margin: '1.5rem' }}>
                <TableHead>
                    <TableRow>
                        <h1>Cadastro de itens</h1>
                    </TableRow>
                    <ItensForm handlePost={this.handleSubmit}></ItensForm>
                </TableHead>
                <TableHead>
                    <h1>Lista de itens</h1>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Dano</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listaItens}
                </TableBody>
            </Table>
        )
    }
}
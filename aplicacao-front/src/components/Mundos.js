import React from 'react'
import Axios from 'axios'
import MundosForm from './MundosForm'
import { Table, TableHead, TableBody, TableCell, TableRow, Button } from '@material-ui/core'

export default class Mundos extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            mundos: [],
            selecionado: null
        }

    }

    componentDidMount = () => {
        this.handleGet()
    }

    handleGet = () => {
        const url = 'http://localhost:9000/mundos'
        var request = Axios.get(url)

        request.then((response) => {
            console.log(response.data)

            this.setState({
                mundos: response.data
            })

        })
    }

    handleSubmit = (mundo) => {
        if (this.state.selecionado == null) {
            this.handlePost(mundo)
        } else {
            this.handlePut(this.state.selecionado, mundo)
        }

    }

    handlePost = (mundo) => {
        const url = 'http://localhost:9000/mundos'
        var request = Axios.post(url, mundo)

        request.then((response) => {
            this.handleGet()
        })

    }

    handlePut = (_id, mundo) => {

        this.setState({
            selecionado: null
        })

        const url = 'http://localhost:9000/mundos/' + _id
        var request = Axios.put(url, mundo)

        request.then((response) => {
            this.handleGet()
        })

    }

    handleDelete = (_id) => {
        console.log("deletar" + _id)

        const url = 'http://localhost:9000/mundos/' + _id
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

        var listaMundos = this.state.mundos.map((item, _id) => {
            return <TableRow key={item._id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>({item.regiao})</TableCell>
                <Button onClick={() => this.handleDelete(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Deletar</Button>
                <Button onClick={() => this.handleSelect(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Selecionar</Button>
            </TableRow>
        })

        return (

            <Table style={{ margin: '1.5rem' }}>
                <TableHead>
                    <TableRow>
                        <h1>Cadastro de Mundos</h1>
                    </TableRow>
                    <MundosForm handlePost={this.handleSubmit}></MundosForm>
                </TableHead>
                <TableHead>
                    <h1>Lista de Mundos</h1>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Região</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listaMundos}
                </TableBody>
            </Table>

        )
    }
}
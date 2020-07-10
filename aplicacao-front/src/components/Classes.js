import React from 'react'
import Axios from 'axios'
import ClassesForm from './ClassesForm'
import { Table, TableHead, TableBody, TableCell, TableRow, Button } from '@material-ui/core'

export default class Classes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            classes: [],
            selecionado: null
        }

    }

    componentDidMount = () => {
        this.handleGet();
        
        
    }

    handleGet = () => {
        const url = 'http://localhost:9000/classes'
        var request = Axios.get(url)

        request.then((response) => {
            console.log(response.data)

            this.setState({
                classes: response.data
            })

        })
    }

    // handleGetId = (_id) => {
    //     console.log(_id);
    //     const url = 'http://localhost:9000/classes/' + _id
    //     var request = Axios.get(url)

    //     request.then((response) => {
    //         console.log(response.data)

    //         this.setState({
    //             classes: response.data
    //         })

    //     })
    // }

   
    handleSubmit = (classe) => {
        if (this.state.selecionado == null) {
            this.handlePost(classe)
        } else {
            this.handlePut(this.state.selecionado, classe)
        }

    }

    handlePost = (classe) => {
        const url = 'http://localhost:9000/classes'
        var request = Axios.post(url, classe)

        request.then((response) => {
            this.handleGet()
        })

    }

    handlePut = (_id, classe) => {

        this.setState({
            selecionado: null
        })

        const url = 'http://localhost:9000/classes/' + _id
        var request = Axios.put(url, classe)

        request.then((response) => {
            this.handleGet()
        })

    }

    handleDelete = (_id) => {
        console.log("deletar" + _id)

        const url = 'http://localhost:9000/classes/' + _id
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

        var listaClasses = this.state.classes.map((item, _id) => {
            return <TableRow key={item._id}>
                <TableCell>{item.nome}</TableCell>
                <Button onClick={() => this.handleDelete(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Deletar</Button>
                <Button onClick={() => this.handleSelect(item._id)} variant="contained" color="primary" style={{ margin: '0.5rem' }}>Selecionar</Button>
            </TableRow>
        })

        return (

            <Table style={{ margin: '1.5rem' }}>
                <TableHead>
                    <TableRow>
                        <h1>Cadastro de Classes</h1>
                    </TableRow>
                    <ClassesForm handlePost={this.handleSubmit}></ClassesForm>
                </TableHead>
                <TableHead>
                    <h1>Lista de Classes</h1>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listaClasses}
                </TableBody>
            </Table>

        )
    }
}
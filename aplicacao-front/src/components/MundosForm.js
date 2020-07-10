import React from 'react'
import { Button, TextField, FormControl } from '@material-ui/core'

export default class MundosForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: "",
            regiao: "",
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const mundo = {
            nome: this.state.nome,
            regiao: this.state.regiao
        }

        this.props.handlePost(mundo)
    }

    handleChange = (event) => {
        event.preventDefault()

        this.setState({
            [event.target.id]: event.target.value
        })

    }

    render() {

        return (
            <FormControl style={{ margin: '3rem' }}>
                <TextField type="text" id="nome" placeholder="Nome" value={this.state.nome} onChange={this.handleChange}></TextField><br></br>
                <TextField type="text" id="regiao" placeholder="Região" value={this.state.regiao} onChange={this.handleChange}></TextField>
                <Button onClick={this.handleSubmit} variant="contained" color="primary" style={{ margin: '1rem' }}>Cadastrar</Button>
            </FormControl>
        )
    }

}
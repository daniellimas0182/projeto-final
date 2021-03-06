import React from 'react'
import {Button, TextField, FormControl} from '@material-ui/core'

export default class ClassesForm extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            nome: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const classe = {
            nome: this.state.nome,
        }

        this.props.handlePost(classe)
    }

    handleChange = (event) => {
        event.preventDefault()

        this.setState({
            [event.target.id]: event.target.value
        })

    }

    render(){
        return(
        <FormControl style={{margin: '3rem'}}>
            <TextField type="text" id="nome" placeholder="Nome" value={this.state.nome} onChange={this.handleChange}></TextField>
            <Button onClick={this.handleSubmit} variant="contained" color="primary" style={{margin: '1rem'}}>Cadastrar</Button>
        </FormControl>
        )
    }




}
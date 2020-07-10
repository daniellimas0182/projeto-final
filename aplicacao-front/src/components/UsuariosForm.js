import React from 'react'
import {Button, TextField, FormControl} from '@material-ui/core'

export default class UsuariosForm extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            nome: "",
            senha: "",
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const usuario = {
            nome: this.state.nome,
            senha: this.state.senha
        }

        this.props.handlePost(usuario)
    }

    handleChange = (event) => {
        event.preventDefault()

        this.setState({
            [event.target.id]: event.target.value
        })

    }


    render(){
        return(
         <FormControl  onSubmit={this.handleSubmit}>
            <TextField  type="text" id="nome" placeholder="Nome" value={this.state.nome} onChange={this.handleChange}></TextField>
            <TextField  type="password" id="senha" placeholder="Senha" value={this.state.senha} onChange={this.handleChange}></TextField>
            <Button onClick={this.handleSubmit} variant="contained" color="primary" style={{margin: '1rem'}}>Cadastrar</Button>
        </FormControl> 
        )
    }
}
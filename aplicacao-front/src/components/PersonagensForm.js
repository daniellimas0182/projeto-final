import React from 'react'
import Axios from 'axios'
import {Button, TextField, FormControl} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class PersonagensForm extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            nome: "",
            cor_cabelo: "",
            altura: "",
            mundos: [],
            classes: [],
            itens: [],
            usuarios: [],
            mundoPersonagem: null,
            classePersonagem: null,
            itemPersonagem: null,
            usuarioPersonagem: null
        }
        this.handleGetMundo();
        this.handleGetClasse();
        this.handleGetItem();
        this.handleGetUsuario();

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
        const url = 'http://localhost:9000/usuarios'
        var request = Axios.get(url)

        request.then((response) => {
            console.log("Tou aqui")
            console.log(response.data)
        

            this.setState({
                usuarios: [...response.data]
            })

        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const personagem = {
            nome: this.state.nome,
            cor_cabelo: this.state.cor_cabelo,
            altura: this.state.altura,
            mundoPersonagem: this.state.mundoPersonagem,
            classePersonagem: this.state.classePersonagem,
            itemPersonagem: this.state.itemPersonagem,
            usuarioPersonagem: this.state.usuarioPersonagem
        }

        this.props.handlePost(personagem)
        console.log(personagem);
    }

    handleChange = (event) => {
        event.preventDefault()

        this.setState({
            [event.target.id]: event.target.value
        })
    }

      onHandleChangeMundo = (e, mundoSelecionado) => {
       this.setState({
        mundoPersonagem: mundoSelecionado
       });
      };

      onHandleChangeClasse = (e, classeSelecionado) => {
        this.setState({
         classePersonagem: classeSelecionado
        });
       };

       onHandleChangeItem = (e, itemSelecionado) => {
        this.setState({
            itemPersonagem: itemSelecionado
        });
       };

       onHandleChangeUsuario = (e, usuarioSelecionado) => {
        this.setState({
            usuarioPersonagem: usuarioSelecionado
        });
       };


    render(){
        return( 
        <FormControl style={{margin: '3rem'}}>
            <TextField type="text" id="nome" placeholder="Nome" value={this.state.nome} onChange={this.handleChange}></TextField><br></br>
            <TextField type="text" id="cor_cabelo" placeholder="Cor do cabelo" value={this.state.cor_cabelo} onChange={this.handleChange}></TextField><br></br>
            <TextField type="text" id="altura" placeholder="Altura" value={this.state.altura} onChange={this.handleChange}></TextField>
            <Autocomplete 
                  options={this.state.mundos}
                  getOptionLabel={(option) => option.nome}
                  style={{margin: '1rem'}}
                  onChange={this.onHandleChangeMundo}
                  renderInput={(params) => <TextField {...params} name="mundoPersonagem" 
                  id="mundoPersonagem" label="Mundo" variant="outlined" />}
                />
                <Autocomplete 
                  options={this.state.classes}
                  getOptionLabel={(option) => option.nome}
                  style={{margin: '1rem'}}
                  onChange={this.onHandleChangeClasse}
                  renderInput={(params) => <TextField {...params} name="classePersonagem" 
                  id="classePersonagem" label="Classe" variant="outlined" />}
                />
                <Autocomplete 
                  options={this.state.itens}
                  getOptionLabel={(option) => option.nome}
                  style={{margin: '1rem'}}
                  onChange={this.onHandleChangeItem}
                  renderInput={(params) => <TextField {...params} name="itemPersonagem" 
                  id="itemPersonagem" label="Item" variant="outlined" />}
                />
                <Autocomplete 
                  options={this.state.usuarios}
                  getOptionLabel={(option) => option.nome}
                  style={{margin: '1rem'}}
                  onChange={this.onHandleChangeUsuario}
                  renderInput={(params) => <TextField {...params} name="usuarioPersonagem" 
                  id="usuarioPersonagem" label="Usuario" variant="outlined" />}
                />
            <Button onClick={this.handleSubmit } variant="contained" color="primary" style={{margin: '1rem'}}>Cadastrar</Button>
        </FormControl>
        )
    }


}
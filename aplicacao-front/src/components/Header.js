import React from 'react'
import {Button, Toolbar, AppBar, Typography} from '@material-ui/core'

export default class Header extends React.Component{
    render(){
        return(
        <AppBar position="static">
        <Toolbar>
            <Typography variant='h5'>Menu Personagens</Typography>
            <Button color="inherit" href="/usuarios">Usuários</Button>
            <Button color="inherit" href="/classes">Classes</Button>
            <Button color="inherit" href="/itens">itens</Button>
            <Button color="inherit" href="/mundos">mundos</Button>
            <Button color="inherit" href="/personagens">personagens</Button>
            </Toolbar>
        </AppBar>
        )
    }
    
}

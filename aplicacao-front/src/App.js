import React from 'react';
import Header from './components/Header';
import Usuarios from './components/Usuarios';
import Classes from './components/Classes';
import Itens from './components/Itens';
import Mundos from './components/Mundos';
import Personagens from './components/Personagens';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Container, Box } from "@material-ui/core";
import './App.css';



function App() {
  return (
    <Box>
    <Header></Header>
    <Container>
    <BrowserRouter>
    <Switch>
      <Route exact path='/usuarios' component={Usuarios}></Route>
      <Route exact path='/classes' component={Classes}></Route>
      <Route exact path='/itens' component={Itens}></Route>
      <Route exact path='/mundos' component={Mundos}></Route>
      <Route exact path='/personagens' component={Personagens}></Route>
    </Switch>
    </BrowserRouter>
    </Container>
    </Box>
  );
}

export default App;

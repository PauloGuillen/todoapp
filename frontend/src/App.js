import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';

import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Signup from './components/signup';
import TodoDataService from './services/todos';


function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("token");
  const [error, setError] = useState('');

  async function login(user = null){ // default user to null
    TodoDataService.login(user)
      .then(response =>{
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
        console.log('login token: ', localStorage.token);
      })
      .catch( e =>{
        console.log('login', e);
        setError(e.toString());
      });
  }

  async function logout(){
    setToken('');
    setUser('');
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }

  async function signup(user = null){ // default user to null
    TodoDataService.signup(user)
      .then(response =>{
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        console.log('signup token: ', localStorage.token);
      })
      .catch( e =>{
        console.log(e);
        setError(e.toString());
      })
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>Todo App 1</Navbar.Brand>
          <Nav className="me-auto">
          <Container>
            <Link class="nav-link" to={"/todos"}>Todos</Link>
            { user ? (
              <Link class="nav-link" onClick={logout}>Logout ({user})</Link>
            ) : (
              <>
                <Link class="nav-link" to={"/login"}>Login</Link>
                <Link class="nav-link" to={"/signup"}>Sign Up</Link>
              </>
            )}
          </Container>
          </Nav>
        </div>
      </Navbar>
      <div className="container mt-4">
      <Routes>
          {/* <Route path="/" element={<TodosList />} /> */}
            <Route index element={
              <TodosList  token={token} />} >
            </Route>
            <Route path="/todos" element={
              <TodosList token={token} />} >
            </Route>
            <Route path="/todos/create" element={(props) =>
              <AddTodo {...props} token={token} />} />
            <Route path="/todos/:id/" element={<AddTodo />} />
            <Route path="/login" element={
              <Login login={login} /> }>
            </Route>
            <Route path="/signup" element={
              <Signup signup={signup}/> }>
            </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

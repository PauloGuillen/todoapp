import React, {useState, useEffect} from 'react';
import TodoDataService from '../services/todos';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const TodosList = props => {
  const [todos, setTodos] = useState([]);

  useEffect(() =>{
    retrieveTodos();
  }, [props.token]);

  const retrieveTodos = () => {
    TodoDataService.getAll(props.token)
    .then(response => {
      setTodos(response.data);
      console.log('retrieveTodos: ', response.data);
    })
    .catch( e => {
      console.log(e);
    });
  }

  return (
    <Container>
      {todos.map((todo) => {
        return (
          <Card key={todo.id} className="mb-3">
            <Card.Body>
              <div>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
                <Card.Text>Date created: {todo.created}</Card.Text>
              </div>
              <Link to={{
                pathname: "/todos/" + todo.id,
                state: {
                  currentTodo: todo
                }
              }}>
                <Button variant="outline-info" className="me-2">
                  Edit
                </Button>
              </Link>
              <Button variant="outline-danger">
                Delete
              </Button>
            </Card.Body>
          </Card>
        )
      })}
    </Container>
  );
}

export default TodosList;

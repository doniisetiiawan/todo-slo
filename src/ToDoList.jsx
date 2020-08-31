/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from './App';
import useAPI from './useAPI';

function ToDoList() {
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? 'Edit' : 'Add';

  const endpoint = 'http://localhost:3004/todos/';
  const savedTodos = useAPI(endpoint);

  useEffect(() => {
    dispatch({ type: 'get', payload: savedTodos });
  }, [savedTodos]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (editMode) {
      await axios.patch(endpoint + editTodo.id, {
        text: todoText,
      });
      dispatch({
        type: 'edit',
        payload: { ...editTodo, text: todoText },
      });
      setEditMode(false);
      setEditTodo(null);
    } else {
      const newToDo = { id: uuidv4(), text: todoText };
      await axios.post(endpoint, newToDo);
      dispatch({ type: 'add', payload: newToDo });
    }
    setTodoText('');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter To Do"
            onChange={event => setTodoText(event.target.value)}
            value={todoText}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {buttonTitle}
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.text}</td>
              <td
                onClick={() => {
                  setTodoText(todo.text);
                  setEditMode(true);
                  setEditTodo(todo);
                }}
              >
                <Button variant="link">Edit</Button>
              </td>
              <td
                onClick={async () => {
                  await axios.delete(endpoint + todo.id);
                  dispatch({
                    type: 'delete',
                    payload: todo,
                  });
                }}
              >
                <Button variant="link">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ToDoList;

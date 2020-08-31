/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { TodosContext } from './App';

function ToDoList() {
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? 'Edit' : 'Add';

  const handleSubmit = event => {
    event.preventDefault();
    if (editMode) {
      dispatch({
        type: 'edit',
        payload: { ...editTodo, text: todoText },
      });
      setEditMode(false);
      setEditTodo(null);
    } else {
      dispatch({ type: 'add', payload: todoText });
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
            onChange={event =>
              setTodoText(event.target.value)
            }
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
                Edit
              </td>
              <td
                onClick={() =>
                  dispatch({
                    type: 'delete',
                    payload: todo,
                  })
                }
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ToDoList;

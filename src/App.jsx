import React, { useReducer } from 'react';
import { hot } from 'react-hot-loader/root';
import Container from 'react-bootstrap/Container';
import ToDoList from './ToDoList';

const todosInitialState = {
  todos: [],
};

function todosReducer(state, action) {
  switch (action.type) {
    case 'get':
      return { ...state, todos: action.payload };

    case 'add':
      const addedToDos = [...state.todos, action.payload];
      return { ...state, todos: addedToDos };

    case 'delete':
      const filteredTodoState = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };

    case 'edit':
      const updatedToDo = { ...action.payload };
      const updatedToDoIndex = state.todos.findIndex(
        t => t.id === action.payload.id
      );
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ];
      return { ...state, todos: updatedToDos };

    default:
      return todosInitialState;
  }
}

export const TodosContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  return (
    <div>
      <Container>
        <TodosContext.Provider value={{ state, dispatch }}>
          <ToDoList />
        </TodosContext.Provider>
      </Container>
    </div>
  );
}

export default hot(App);

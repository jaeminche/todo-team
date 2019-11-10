import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import './App.css';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'todo1', checked: true },
    { id: 2, text: 'todo2', checked: true },
    { id: 3, text: 'todo3', checked: false },
  ]);
  // use useRef because id is not to be rendered, nor to be shown.
  const nextId = useRef(4);
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );
  const onRemove = useCallback(
    id => setTodos(todos.filter(todo => todo.id !== id)),
    [todos],
  );
  const onToggle = useCallback(id =>
    setTodos(
      todos.map(todo =>
        id === todo.id ? { ...todo, checked: !todo.checked } : todo,
      ),
      [todos],
    ),
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;

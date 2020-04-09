import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as TodoActions } from '../../store/ducks/todos';

import './style.css';

const TodoList = ({ todos, addTodo, toggleTodo, removeTodo }) => {
  const [item, setItem] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    addTodo(item);

    setItem('');
  }
  
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit">Novo</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.complete ? <s>{todo.text}</s> : todo.text}
            <div>
              <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </li>
        ))
        }
      </ul>
    </section>
  );
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TodoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

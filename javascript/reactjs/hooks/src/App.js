import React, { useState } from 'react';
import './App.css';

function Todo ({ todo, index, completeTodo, removeTodo, isCompleted, move, count }){
  return (
    <div
      className="todo"
      style={{ padding: '10px 0', textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <button onClick={ e => removeTodo(index) }>x</button>
      <button onClick={ e => move(index, 'up') } disabled={ index == 0 }>^</button>
      <button onClick={ e => move(index, 'down') } disabled={ index == count - 1 }>v</button>
      <span style={{ margin: '0 15px' }}>{ todo.text }</span>
      { !todo.isCompleted && <button onClick={ e => completeTodo(index) }>Complete</button> }
    </div>
  )
}

function TodoForm({ addTodo }) {

  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input 
        style={{ width: '100vh', height: '50px', padding: '10px', marginTop: 15, fontSize: 16 }} 
        type="text" 
        placeholder="Add todo..." 
        value={ value }
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

function App() {

  const [todos, setTodos] = useState([
    {
      text: 'Learn Javascript',
      isCompleted: false
    },
    {
      text: 'Learn HTML CSS',
      isCompleted: true
    },
    {
      text: 'Learn React',
      isCompleted: false
    }
  ])
  
  const addTodo = text => {
    let newTodos = [...todos, { text }]
    setTodos(newTodos)
  }

  const completeTodo = index => {
    let newTodos = [...todos]
    newTodos[index].isCompleted = true
    setTodos(newTodos)
  }

  const removeTodo = index => {
    let newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  
  const move = (index, to) => {
    let newTodos = [...todos]
    let nextIndex = to === 'up' ? index-1 : index+1
    let nextTarget = newTodos[nextIndex]
    newTodos[nextIndex] = newTodos[index]
    newTodos[index] = nextTarget
    setTodos(newTodos)
  }
  
  return (
    <div className="App">
      {
        todos.map((todo, index) => 
          <Todo 
            todo={ todo } 
            key={ index }
            index={ index }
            completeTodo={ completeTodo }
            removeTodo={ removeTodo }
            move={ move }
            count={ todos.length }
          />
        )
      }
      <TodoForm addTodo={ addTodo }/>
    </div>
  );
}

export default App;

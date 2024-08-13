import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Todo } from '@/stores/todos' // type 이라고 명시해주면 데이터인지 타입인지 구분이 가능
import { useTodosStore } from '@/stores/todos'

export default function TodoItem({ todo,}: { todo: Todo}) {
  const [title, setTitle] = useState(todo.title)
  const [done, setDone] = useState(todo.done)
  const updateTodo = useTodosStore(state => state.updateTodo)
  const deleteTodo = useTodosStore(state => state.deleteTodo)

  useEffect(() => {
    setTitle(todo.title)
    setDone(todo.done)
  }, [todo])

  async function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") { 
      updateTodo({
        ...todo,
        title
      })
    }
  }

  return (
    <li>
      <Link to={`/${todo.id}`}>{todo.title}</Link>
      <input 
          type="checkbox" 
          checked={done} 
          onChange={e => {
            setDone(e.target.checked)
              updateTodo({
                ...todo,
                done: e.target.checked
              })
          }}
        />  
      <input
         value={title} 
        //  defaultValue={todo.title}
         onChange={e => setTitle(e.target.value)} 
         onKeyDown={keydownHandler}
         />
         <button onClick={() => deleteTodo(todo)}>삭제</button>
      </li>
  )
}


import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Todo } from '@/routes/Main' // type 이라고 명시해주면 데이터인지 타입인지 구분이 가능

export default function TodoItem({ 
  todo,
  setTodo,
  deleteTodo
}: { 
  todo: Todo
  setTodo: (updatedTodo: Todo) => void
  deleteTodo: (todoToDelete: Todo) => void
}) {
  const [title, setTitle] = useState(todo.title)

  async function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") { 
      updateTodo()
    }
  }
  async function updateTodo() {
  // 낙관적 업데이트
    setTodo({ ...todo, title })
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT9_AHMq2s7n',
            username: 'FE1_LeeYeonJi'
          },
          body: JSON.stringify({
            title,
            done: todo.done
          })
        }
      )
      const updatedTodo: Todo = await res.json()
      console.log(updatedTodo, title)
    } catch (error) {
      // 어?! 문제가 생겼네..
      // 근데, 나는 낙관적으로 업데이트를 이미 했는데..
      // 어쩌지?
      console.error(error)
      setTodo(todo)
    }
    // setTodo(updatedTodo)
  }
  async function deleteMe() {
    console.log('deleteMe!!')
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
          username: 'FE1_LeeYeonJi'
        }
      }
    )
    deleteTodo(todo)
  }

  return (
    <li>
      <Link to={`/${todo.id}`}>{todo.title}</Link>
      <input
         value={title} 
        //  defaultValue={todo.title}
         onChange={e => setTitle(e.target.value)} 
         onKeyDown={keydownHandler}
         />
         <button onClick={deleteMe}>삭제</button>
      </li>
  )
}


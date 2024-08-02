import { useState } from 'react'
import type { Todo } from '../App' // type 이라고 명시해주면 데이터인지 타입인지 구분이 가능

export default function TodoItem({ 
  todo,
  getTodos
 }: { 
  todo: Todo 
getTodos: () => {}
}) {
  const [title, setTitle] = useState(todo.title)

  async function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") { 
      updateTodo()
  }
}
async function updateTodo() {
  console.log('서버로전송', title)
      const res = await fetch (`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`, 
        {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          //개체의 속성이름은 특수기호를 쓸수없음
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
        },
        body: JSON.stringify({
          title,
          done: todo.done
        })
      }
    )
      const data = await res.json()
      console.log(data, title)
      getTodos()
    }
    async function deleteTodo() {
      await fetch (`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`, 
        {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
        }
      }
    )
      // const data = await res.json() // 포장뜯는행위 // 분석코드
  }

  return (
    <li>
      {todo.title}
      <input
         value={title} 
        //  defaultValue={todo.title}
         onChange={e => setTitle(e.target.value)} 
         onKeyDown={keydownHandler}
         />
         <button onClick={deleteTodo}>삭제</button>
      </li>
  )
}


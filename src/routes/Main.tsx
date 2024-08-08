// eslint-disable-next-line
import {useState, useEffect, Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import TheLoader from '@/components/TheLoader'
import TodoItem from '@/components/TodoItem'
import TodoCreator from '@/components/TodoCreator'

// export interface ResponseValue {
//   tital: number
//   todos: User[]
// }

export type Todos = Todo[]
export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}




export default function App() {
  const [todos, setTodos] = useState<Todos>([])
  // const [count, setCount] = useState(31) // [] -> 구조분해할당
  const [message, setMessage] = useState('') // 타입추론(Inference)
  const [loading, setLoading] = useState(true)
  // const [name, setName] = useState('')
  // App 컴포넌트가 준비되었을 때! (Mount, 최초 렌더링)
  // useEffect(콜백, 의존성배열)
  useEffect(() => {
    getTodos()
  }, [])


  // function increase() {
  //   // count += 1
  //   setCount(count + 1)
  // }

  async function getTodos() {
    try {
      const res = await fetch (
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',// method 가 표시되어있지 않으면 기본적으로 'GET'이 적용되어있음
        {
          headers: {
          'content-type': 'application/json',
          //개체의 속성이름은 특수기호를 쓸수없음
            apikey: 'KDT9_AHMq2s7n',
            username: 'FE1_LeeYeonJi'
          }
        }
      )
      const data = await res.json()
      console.log('응답결과:', data)
      setTodos(data)
    } catch (error) { 
      if (error instanceof Error) {
        // console.error('에러임..', error.message)
        const message = '서버가 폭발했어요!'
        console.error('에러임..', message)
        setMessage(message)
      } 
    } finally {
      setLoading(false)
    }
  }


function setTodo(updatedTodo: Todo) {
  setTodos(todos => { 
    return todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo
      }
      return todo
    })
    })
  } 
  function deleteTodo(todoToDelete: Todo) {
    setTodos(todos => { 
      return todos.filter(todo => todo.id !== todoToDelete.id )
    })
  }  

  return (
    <>
      <TodoCreator getTodos={getTodos} />
      {/* <div>{count}명</div>
      <button onClick={increase}>증가+</button> */}
      <div>{loading && <TheLoader/>}</div>
      <div>{message}</div>
      <ul>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem 
              todo={todo} 
              setTodo={setTodo}
              deleteTodo={deleteTodo}
           />
          </Fragment>
          
        ))}
      </ul>
      <Outlet />
    </>
  )
}




 


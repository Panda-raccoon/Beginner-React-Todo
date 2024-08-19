import { Outlet } from 'react-router-dom'
import TheLoader from '@/components/TheLoader'
import TodoItem from '@/components/TodoItem'
import TodoCreator from '@/components/TodoCreator'
import { useTodosStore } from '@/stores/todos'
import { useEffect, Fragment } from 'react'
// export interface ResponseValue {
//   tital: number
//   todos: User[]
// }

export default function App() {
  // const [name, setName] = useState('')
  // App 컴포넌트가 준비되었을 때! (Mount, 최초 렌더링)
  // useEffect(콜백, 의존성배열)
  // const 상태 = useTodoStore(function (스토어) {return 스토어.상태})
  const todos = useTodosStore(state => state.todos )
  const message = useTodosStore(state => state.message )
  const loading = useTodosStore(state => state.loading )
  const getTodos = useTodosStore(state => state.getTodos )

  useEffect(() => {
    getTodos()
  }, [])


  return (
    <>
      <TodoCreator getTodos={getTodos} />
      <div>{loading && <TheLoader/>}</div>
      <div>{message}</div>
      <ul>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem 
              todo={todo} 
           />
          </Fragment>
          
        ))}
      </ul>
      <Outlet />
    </>
  )
}




 




  // function increase() {
  //   // count += 1
  //   setCount(count + 1)
  // }
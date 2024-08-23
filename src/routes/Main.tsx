import { useEffect, useRef, Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Sortable from 'sortablejs'
import TheLoader from '@/components/TheLoader'
import TodoItem from '@/components/TodoItem'
import TodoCreator from '@/components/TodoCreator'
import { useTodosStore } from '@/stores/todos'
import TodoFilters from '@/components/TodoFilters'

// export interface ResponseValue {
//   tital: number
//   todos: User[]
// }

export default function App() {
  // const [name, setName] = useState('')
  // App 컴포넌트가 준비되었을 때! (Mount, 최초 렌더링)
  // useEffect(콜백, 의존성배열)
  // const 상태 = useTodoStore(function (스토어) {return 스토어.상태})
  const todos = useTodosStore(state => state.filteredTodos )
  const message = useTodosStore(state => state.message )
  const loading = useTodosStore(state => state.loading )
  const getTodos = useTodosStore(state => state.getTodos )
  const reorderTodos = useTodosStore(state => state.reorderTodos)
  const ListRef =useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    getTodos()
    if(!ListRef.current) return
    new Sortable(ListRef.current, {
      handle: '.drag-handle',
      animation: 0,
      forceFallback: true,
      onEnd: event => {
        console.log(event.oldIndex, event.newIndex)
        if (event.oldIndex === undefined || event.newIndex === undefined) return
        reorderTodos({
          oldIndex: event.oldIndex,
          newIndex: event.newIndex
        })
      }
    })
  }, [])


  return (
    <>
      <TodoCreator getTodos={getTodos} />
      <TodoFilters />
      <div>{loading && <TheLoader/>}</div>
      <div>{message}</div>
      <ul ref={ListRef}>
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
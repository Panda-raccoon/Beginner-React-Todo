import { useNavigate, useParams } from 'react-router-dom'
import styles from './TodoItemModal.module.css'
import { useTodosStore } from '@/stores/todos'


export default function TodoItemModal() {
  const navigate = useNavigate()
  const { todoId } = useParams()
  const todos = useTodosStore(state => state.todos)
  const currentTodo = todos.find(todo => todo.id === todoId )

  function offModal() {
    navigate('/')
    // .....
  }
  return (
    <div className={styles.modal}>
      <div 
        className={styles.overlay}
        onClick={offModal}></div>
      <div className={styles.contents}>
        <div>{ currentTodo?.title }</div>
        <div> { currentTodo?.createdAt } </div>

      </div>
    </div>
  )
}
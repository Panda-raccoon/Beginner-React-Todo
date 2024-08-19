import axios from 'axios'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'


export type Todos = Todo[]
export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export const useTodosStore = create (
  combine({
    todos: [] as Todos,
    message: '',
    loading: true,
  }, 
    function (set) {
      async function getTodos() {
        try {
          const { data } = await axios.post('/api/todos')
          console.log('응답 결과', data)
          set ({
            todos: data
          })
        } catch (error) { 
          if (error instanceof Error) {
            // console.error('에러임..', error.message)
            const message = '서버가 폭발했어요!'
            console.error('에러임..', message)
            set ({
              message
            })
          } 
        } finally {
          set ({
            loading: false
          })
        }
      }
      async function updateTodo(updatedTodo: Todo) {
        try {
          await axios.post('api/todos', {
            title: updatedTodo.id,
          endpoint:'',
          method: 'PUT',
          data: {
            title: updatedTodo.title,
            done: updatedTodo.done
          }
        })
          getTodos()
        } catch (error) {
          console.error(error)
        }
      }
      async function deleteTodo(deletedTodo: Todo) {
        await axios.post('/api/todos', {
          endpoint: deletedTodo.id,
          method: 'DELETE'
        })
        await getTodos()
      }
      return {
        getTodos,
        updateTodo,
        deleteTodo
      }
    }  
  )
)


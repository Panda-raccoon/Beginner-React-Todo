import { createBrowserRouter } from 'react-router-dom'
import Main from "./Main"
import TodoItemDetails from './TodoItemDetails'

export const router = createBrowserRouter([
  {
    path: '/',  // 메인 페이지를 뜻함
    element: <Main />,
    children: [
      {
        path: ':todoId',
        element: <TodoItemDetails />
      }
    ]
  }
])

// https://heropy.dev
// http://localhodt:3000
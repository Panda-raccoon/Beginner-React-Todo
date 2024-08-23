import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Main from "./Main"
import TodoItemDetails from './TodoItemDetails'

export default function Index() {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <Routes 
        location={location} 
        key={location.pathname}>
        <Route
          path="/"
          element={<Main/>}>
            <Route
              path={'/:todoId'}
              element={<TodoItemDetails/>}
              />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

// export const router = createBrowserRouter([
//   {
//     path: '/',  // 메인 페이지를 뜻함
//     element: <Main />,
//     children: [
//       {
//         path: ':todoId',
//         element: <TodoItemDetails />
//       }
//     ]
//   }
// ])

// https://heropy.dev
// http://localhodt:3000
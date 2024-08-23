import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes' //index.tsx 는 기본값이어서 생략이 가능 원래는 -> './routes/index.tsx'
// import App from './App.tsx' 


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Router/>
  </BrowserRouter>
)


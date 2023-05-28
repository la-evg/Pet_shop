import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Products } from './components/Products/Products'
import { Authorization } from './components/Authorization/Authorization'
import { Registration } from './components/Registration/Registration'
import { UserData } from './components/UserData/UserData'
import { UserEdit } from './components/UserEdit/UserEdit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Authorization />,
      },
      {
        path: 'registration/',
        element: <Registration />,
      },
      {
        path: 'user/',
        element: <UserData />,
      },
      {
        path: 'user/edit/',
        element: <UserEdit />,
      },
      {
        path: 'products/',
        element: <Products />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  Router,
  RouterProvider
} from "react-router-dom";

import Home from './routes/Home.jsx'
import AddTask from './routes/AddTask.jsx'
import EditTask from './routes/EditTask.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add",
        element: <AddTask />
      },
      {
        path: "/edit/:id",
        element: <EditTask />
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import { Provider } from 'react-redux'
import store from './app/store'
import AuthContextProvider from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </Provider>
    </>
  )
}

export default App

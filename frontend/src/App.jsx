import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import Login from './screens/Login'

function App() {

  const BASE_URL = 'http://localhost:8000'
  const [user, setUser] = useState(null)

  const handleLogin = (username, password) => {
    console.log(username, password);
    axios.post(`${BASE_URL}/login`, {
      username: username,
      password: password
    }).then((res) => {
      console.log(res.data);
      setUser(res.data.role)
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleRegister = (username, password, role) => {
    console.log(username, password, role);
    axios.post(`${BASE_URL}/register`, {
      username: username,
      password: password,
      role: role
    }).then((res) => {
      console.log(res.data);
      setUser(res.data.role)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <Routes>
          {user === null ?
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login handleLogin={handleLogin} handleRegister={handleRegister} />} />
            </>
            :
            (user === 'admin') ?
              <>
                <Route path="/" element={<Home />} />
              </>
              :
              (user === 'vendor') ?
                <>
                  <Route path="/" element={<Home />} />
                </>
                :
                <>
                  <Route path="/" element={<Home />} />
                </>
          }
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default App

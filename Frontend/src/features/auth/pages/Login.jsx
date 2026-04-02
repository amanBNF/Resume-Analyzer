import React from 'react'
import "../auth.form.scss"
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useState } from 'react'
import LoadingScreen from '../pages/Loading.jsx'

const Login = () => {

  const {handleLogin, loading} = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({email, password})
    navigate('/');
  }

  if(loading){
    return (<main><LoadingScreen /></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => {setEmail(e.target.value)}} type="email" id='email' name='email' placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password" id='password' name='password' placeholder="Enter your password" />
          </div>

          <button className='button primary-button' type="submit">Login</button>

          <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login
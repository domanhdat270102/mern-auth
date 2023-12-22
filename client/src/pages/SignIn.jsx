import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  const {loading, error} = useSelector(state => state.user)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
  
      const data = await res.json()
      if (data.success === false) {
        // setError(data.message);
        // setLoading(false)
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false)
      // setError(null)
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      // setLoading(false)
      // setError(error.message)
      dispatch(signInFailure(error.message))
    }
  }
  console.log(formData);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="email" placeholder="email" id="email" onChange={handleChange} className="border p-3 rounded-lg"/>

        <input type="password" placeholder="password" id="password" onChange={handleChange} className="border p-3 rounded-lg"/>

        <button disabled={loading} className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase">
          {loading ? 'Loading...' : 'Sign in'}
        </button>

        <Oauth />

        <div className="mt-5 flex gap-2">
          <p>Dont have an account</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  )
}

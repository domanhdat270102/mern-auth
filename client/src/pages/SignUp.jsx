import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
  
      const data = await res.json()
      if (data.success === false) {
        setError(data.message);
        setLoading(false)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  console.log(formData);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="border p-3 rounded-lg"/>

        <input type="email" placeholder="email" id="email" onChange={handleChange} className="border p-3 rounded-lg"/>

        <input type="password" placeholder="password" id="password" onChange={handleChange} className="border p-3 rounded-lg"/>

        <button disabled={loading} className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase">
          {loading ? 'Loading...' : 'Sign up'}
        </button>

        <div className="mt-5 flex gap-2">
          <p>Have an account</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  )
}

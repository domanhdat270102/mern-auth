import { Link, useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
export default function Header() {
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <header className="bg-slate-200 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-3">
          <Link to='/'>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Sahara</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>

            <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64"/>
              <button>
                <FaSearch className="text-slate-600" />
              </button>
            </form>
            <ul className="flex gap-4 items-center  ">
              <Link to={'/'}>
                <li className="hidden sm:inline hover:underline text-slate-700">
                  Home
                </li>
              </Link>

              <Link to={'/about'}>
                <li className="hidden sm:inline hover:underline text-slate-700">
                  About
                </li>
              </Link>
              <Link to={'/profile'}>
              {currentUser ? (
                  <img src={currentUser.avatar} alt="profile" className="rounded-full w-7 h-7 object-cover"/>
              ) : (
                <li className="text-slate-700 hover:underline">Sign in</li>
              )}
              </Link>
            </ul>
        </div>
    </header>
  )
}

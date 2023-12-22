import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux'
export default function Header() {

  const {currentUser} = useSelector(state => state.user)
  return (
    <header className="bg-slate-200 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-3">
          <Link to='/'>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Sahara</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>

            <form className="bg-slate-100 p-3 rounded-lg flex items-center">
              <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64"/>
              <FaSearch className="text-slate-600"/>
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

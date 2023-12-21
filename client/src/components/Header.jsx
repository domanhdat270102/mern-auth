import { Link } from "react-router-dom"
export default function Header() {
  return (
    <div className="bg-slate-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-3">
            <p className="font-bold">Auth App</p>
            <ul className="flex gap-4">
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/signin'}>Sign in</Link>
            </ul>
        </div>
    </div>
  )
}

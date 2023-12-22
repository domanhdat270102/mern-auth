import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
          Profile
      </h1>

      <form className="flex flex-col gap-4">
          <img src={currentUser.avatar} alt="profile" className="rounded-full w-24 h-24 self-center object-cover cursor-pointer"/>
          <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg focus:outline-none"/>
          <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg focus:outline-none"/>
          <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg focus:outline-none"/>
          <button className="p-3 bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
              Update
          </button>

          <div className="flex justify-between">
            <span className="text-red-700 cursor-pointer">
              Delete Account
            </span>
            <span className="text-red-700 cursor-pointer">Sign out</span>
          </div>
      </form>
    </div>
  )
}

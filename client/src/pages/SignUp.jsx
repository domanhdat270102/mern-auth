import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Sign up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg"/>

        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg"/>

        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg"/>

        <button className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95 disabled:opacity-80">Sign up</button>

        <div className="mt-5 flex gap-2">
          <p>Have an account</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

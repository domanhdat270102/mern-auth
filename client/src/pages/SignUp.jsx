// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Oauth from "../components/Oauth";

// export default function SignUp() {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({})
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const handleChange = (e) => {
//     const { value } = e.target;
//     if (value.length <= 5) {
//       setError('Độ dài tối thiểu là 6 ký tự đến 50 ký tự')
//       return;
//     }
//     if (
//       e.target.type === 'password' &&
//       value.length > 5 &&
//       // eslint-disable-next-line no-useless-escape
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#=?\$%\^&\*])/.test(value)
//     ) {
//       setError(
//         "Độ dài từ 6 đến 50 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt."
//       );
//       return;
//     } else {
//       setError("");
//     }
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     })
//   }

//   const handleSubmit = async(e) => {
//     e.preventDefault()
//     try {
//       setLoading(true)
//       if (error) {
//         setLoading(false)
//         console.log(error);
//         return error
//       }
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
  
//       const data = await res.json()
//       if (data.success === false) {
//         setError(data.message);
//         setLoading(false)
//         return;
//       }
//       setLoading(false)
//       setError(null)
//       navigate('/sign-in')
//     } catch (error) {
//       setLoading(false)
//       setError(error.message)
//     }
//   }
//   console.log(formData);
//   return (
//     <div className="max-w-lg p-3 mx-auto">
//       <h1 className="text-center my-7 text-3xl font-semibold">Sign up</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <input type="text" placeholder="username" id="username" onChange={handleChange} className="border p-3 rounded-lg"/>

//         <input type="email" placeholder="email" id="email" onChange={handleChange} className="border p-3 rounded-lg"/>

//         <input type="password" placeholder="password" id="password" onChange={handleChange} className={`border p-3 rounded-l ${error? "border-b-2px border-b-[#E60019]": ""}`}/>
//         <p className="text-red-700">{error ? error : ''}</p>
//         <button disabled={loading} className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase">
//           {loading ? 'Loading...' : 'Sign up'}
//         </button>
        
//         <Oauth />
//         <div className="mt-5 flex gap-2">
//           <p>Have an account</p>
//           <Link to={"/sign-in"}>
//             <span className="text-blue-700">Sign in</span>
//           </Link>
//         </div>
//         {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
//       </form>
//     </div>
//   )
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { useFormik } from "formik";
import { registerCandidateSchema } from "../utils/validations";
import Input from "../components/Input";
import {toast} from 'react-hot-toast'

export default function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const SignupFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: registerCandidateSchema,
    onSubmit: async (values) => {
      const dataSignup = {
        ...values
      }
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSignup),
      })
  
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false)
        return;
      }
      setLoading(false)
      toast.success(data.message)
      setTimeout(() => {
        navigate('/sign-in')
      }, 1000)
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
    }
  })

  const getErrorMessage = (field) => {
    return SignupFormik.errors[field] && SignupFormik.touched[field]
      ? SignupFormik.errors[field]
      : "";
  };
  
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={SignupFormik.handleSubmit}>
              <Input
                id="username"
                label={"Username"}
                value={SignupFormik.values.username}
                onChangeInput={SignupFormik.handleChange}
                error={getErrorMessage("username")}
                placeholder={"Nhập họ và tên"}
                required
                className="!mt-1"
              />

            <Input
              id="email"
              label={"Email"}
              value={SignupFormik.values.email}
              onChangeInput={SignupFormik.handleChange}
              error={getErrorMessage("email")}
              placeholder={"Sử dụng email để xác nhận"}
              required
              className="!mt-1"
            />

            <Input
              type="password"
              id="password"
              label={"Mật khẩu"}
              value={SignupFormik.values.password}
              onChangeInput={SignupFormik.handleChange}
              error={getErrorMessage("password")}
              placeholder={
                "Từ 6-50 ký tự, 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt."
              }
              required
              className="!mt-1"
              isCheckPassword
            />
        <button disabled={loading} className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase">
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        
        <Oauth />
        <div className="mt-5 flex gap-2">
          <p>Have an account ?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

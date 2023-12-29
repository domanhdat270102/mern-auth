import { useFormik } from "formik"
import Input from "../components/Input"
import {updatePasswordSchema} from "../utils/validations"
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailSuccess, signInFailure, signInStart } from "../redux/user/userSlice";
import toast from "react-hot-toast";




export default function ForgotPassword() {
    const {loading} = useSelector(state => state.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginFormik = useFormik({
        initialValues: {
          email: location.state,
          otp: '',
          newPassword: ''
        },
        validationSchema: updatePasswordSchema,
        onSubmit: async (values) => {
          const dataLogin = {
            ...values
          }
          try {
            dispatch(signInStart())
            const res = await fetch('/api/forgot-password/reset', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataLogin),
            })
        
            const data = await res.json()
            if (data.success === false) {
              // setError(data.message);
              // setLoading(false)
              dispatch(signInFailure(data.message));
              toast.error(data.message)
              return;
            }
            // setLoading(false)
            // setError(null)
            dispatch(sendEmailSuccess(data))
            toast.success('Thành công')
            setTimeout(() => {
              navigate('/sign-in')
            }, 1000)
          } catch (error) {
            // setLoading(false)
            // setError(error.message)
            dispatch(signInFailure(error.message))
            toast.error('OTP không khớp')
          }
}})

console.log('loginFormik.values.email', loginFormik.values.email);
  return (
    <div>
        <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Cập nhập mật khẩu</h1>
      <form className="flex flex-col gap-4" onSubmit={loginFormik.handleSubmit}>
              <Input
                id="otp"
                placeholder="Nhập otp"
                label="OTP"
                value={loginFormik.values.otp}
                onChangeInput={loginFormik.handleChange}
                className="!mt-1"
                error={
                  loginFormik.errors.otp && loginFormik.touched.otp
                    ? loginFormik.errors.otp
                    : ""
                }
              />

            <Input
                id="newPassword"
                placeholder="Nhập mật khẩu mới"
                label="New Password"
                value={loginFormik.values.newPassword}
                onChangeInput={loginFormik.handleChange}
                className="!mt-1"
                error={
                  loginFormik.errors.newPassword && loginFormik.touched.newPassword
                    ? loginFormik.errors.newPassword
                    : ""
                }
                type="password"
                isCheckPassword
              />

        <button  className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase">
                {loading ? 'Đang cập nhập' : "Cập nhập"}
        </button>
      </form>
    </div>
    </div>
  )
}

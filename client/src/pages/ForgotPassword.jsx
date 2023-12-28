import { useFormik } from "formik"
import Input from "../components/Input"
import { EmailSchema} from "../utils/validations"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailSuccess, signInFailure, signInStart } from "../redux/user/userSlice";
import toast from "react-hot-toast";




export default function ForgotPassword() {
    const {loading} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginFormik = useFormik({
        initialValues: {
          email: '',
        },
        validationSchema: EmailSchema,
        onSubmit: async (values) => {
          const dataLogin = {
            ...values
          }
          try {
            dispatch(signInStart())
            const res = await fetch('/api/forgot-password', {
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
              toast.error('email chưa được tạo, vui lòng khởi tạo email trước')
              return;
            }
            // setLoading(false)
            // setError(null)
            dispatch(sendEmailSuccess(data))
            toast.success('Đã gửi OTP đến gmail của bạn')
            setTimeout(() => {
              navigate('/check-otp', {
                state: loginFormik.values.email
              })
            }, 2000)
          } catch (error) {
            // setLoading(false)
            // setError(error.message)
            dispatch(signInFailure(error.message))
            toast.error(error.message)
          }
}})

console.log('loginFormik.values.email', loginFormik.values.email);
  return (
    <div>
        <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Điền email của bạn</h1>
      <form className="flex flex-col gap-4" onSubmit={loginFormik.handleSubmit}>
              <Input
                id="email"
                placeholder="Nhập email"
                label="Email"
                value={loginFormik.values.email}
                onChangeInput={loginFormik.handleChange}
                className="!mt-1"
                error={
                  loginFormik.errors.email && loginFormik.touched.email
                    ? loginFormik.errors.email
                    : ""
                }
              />

        <button  className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase">
                {loading ? 'Đang gửi' : "Gửi"}
        </button>
      </form>
    </div>
    </div>
  )
}

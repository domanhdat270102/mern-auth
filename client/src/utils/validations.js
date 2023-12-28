import * as Yup from "yup";

export const registerCandidateSchema = Yup.object().shape({
    username: Yup.string().required("Họ và tên không được để trống"),
    email: Yup.string().required("Vui lòng điền email").email("Email không đúng định dạng"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu của bạn")
      .min(6, "Mật khẩu phải ít nhất 6 kí tự")
      .max(50, "Mật khẩu tối đa 50 kí tự")
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#=?\$%\^&\*])/,
        "Độ dài từ 6 đến 50 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt."
      )
  });
  
  export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Nhập email của bạn!")
      .email("Email không đúng định dạng"),
    password: Yup.string().required("Vui lòng nhập mật khẩu của bạn"),
  });
  

  export const EmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Nhập email của bạn!")
      .email("Email không đúng định dạng"),
  });

  export const updatePasswordSchema = Yup.object().shape({
    otp: Yup.string().required("Hãy điền OTP"),
    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu của bạn")
      .min(6, "Mật khẩu phải ít nhất 6 kí tự")
      .max(50, "Mật khẩu tối đa 50 kí tự")
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#=?\$%\^&\*])/,
        "Độ dài từ 6 đến 50 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt."
      )
  });
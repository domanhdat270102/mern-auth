import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

function Input({
  id,
  value,
  label,
  type,
  pattern,
  placeholder,
  onChangeInput,
  className,
  required,
  error,
  disabled,
  isCheckPassword,
}) {
  const [valueInput, setValueInput] = useState(value);
  const [isShow, setIsShow] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  useEffect(() => {
    if (value) {
      setValueInput(value);
    }
  }, [value]);

  const changeValuePassword = (e) => {
    const { value } = e.target;
    if (
      isCheckPassword &&
      value.length > 5 &&
      // eslint-disable-next-line no-useless-escape
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#=?\$%\^&\*])/.test(value)
    ) {
      setErrorInput(
        "Độ dài từ 6 đến 50 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt."
      );
    } else {
      setErrorInput("");
    }

    setValueInput(value);
    onChangeInput(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-[16px] font-[600]">
          {label} <span className="text-red-500">{required && "*"}</span>
        </label>
      )}
      {type === "password" ? (
        <div className="w-full relative">
          <input
            id={id}
            type={isShow ? "text" : "password"}
            value={valueInput}
            onChange={(e) => {
              changeValuePassword(e);
            }}
            placeholder={placeholder}
            className={`block border p-3 rounded-lg w-full text-[14px] focus:outline-none ${className} ${error ? "border-b-[#E60019]" : "border-b-[#1495F3]"}`}

          />
          <div className="absolute top-[30%] right-6">
            {isShow ? (
              <FaRegEyeSlash
                sx={{ fontSize: 30 }}
                onClick={() => setIsShow(!isShow)}
              />
            ) : (
              <FaRegEye
                sx={{ fontSize: 30 }}
                onClick={() => setIsShow(!isShow)}
              />
            )}
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={type || "text"}
          value={valueInput}
          onChange={(e) => {
            setValueInput(e.target.value);
            onChangeInput(e);
          }}
          pattern={pattern}
          placeholder={placeholder}
          className={`block w-full border p-3 rounded-lg border-b-[1px] text-[16px] mt-2 focus:outline-none ${
            error ? "border-b-[#E60019]" : "border-b-[#1495F3]"
          } ${className}`}
          disabled={disabled}
        />
      )}
      {error && error !== "Bắt buộc" && (
        <span className="text-red-500 text-[12px]">{error}</span>
      )}
      {isCheckPassword && errorInput && !error && (
        <span className="text-red-500 text-[12px]">{errorInput}</span>
      )}
    </div>
  );
}

export default Input;

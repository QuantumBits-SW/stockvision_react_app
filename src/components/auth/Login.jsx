import { Button } from "@mui/material";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import InputField from "./InputField";
import { useState } from "react";
import { emailRegex } from "../../utils/validatorConstants";
import { loginUser, getUserProfile } from "../../services/loginService";

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    emailRegex.test(email) ? setIsValid(true) : setIsValid(false);
  }

  const onChange = (e) => {
    const { name, value } = e.target
    name === "Email Address" ? function(){
      setData(data => ({ ...data, email: value }))
      isValidEmail(value)
    }(): name === "Password" ? setData(data => ({ ...data, password: value })) : null
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(data.email, data.password);
      const userData = await getUserProfile(token, {});
      console.log("User Data:", userData);
    } catch (err) {
      console.error("Error during login process:", err);
      setError("Login failed, Please check your credentials!");
    }
  };

  return (
  <div className="flex flex-col justify-center animate-slideInFromRight">
    <form onSubmit={handleSubmit}>
        <InputField autoComplete="email" label="Email Address" Icon={MailOutlinedIcon} onChange={onChange} checked={isValid}/>
        <InputField autoComplete="password" label="Password" Icon={PasswordOutlinedIcon} onChange={onChange}/>
        {error && <p className="text-center text-red-500">{error}</p>}
        <Button
          type="submit"
          variant="contained"
          className={`!rounded-[30px] w-full !mt-2 !p-2 text-white cursor-pointer ${(isValid && data.password !== "") && "!bg-black"}`}
          disabled={!(isValid && data.password !== "")}
          sx={{
            '&.MuiButton-root': {
              '&.Mui-disabled': {
                backgroundColor: "rgba(0, 0, 0, 0.2) !important"
              }
            }
          }}
        >
          Continue
        </Button>
    </form>
  </div>
  )
}

export default Login;
import { Button } from "@mui/material";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import InputField from "./InputField";
import { useState } from "react";

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [isValid, setIsValid] = useState(false);

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    emailRegex.test(email) ? setIsValid(true) : setIsValid(false);
  }

  const onChange = (e) => {
    const { name, value } = e.target
    name === "Email Address" ? function(){
      setData(data => ({ ...data, email: value }))
      isValidEmail(value)
    }(): name === "Password" ? setData(data => ({ ...data, password: value })) : null
  }

  return (
  <div className="flex flex-col justify-center animate-slideInFromRight">
    <form>
        <InputField autoComplete="email" label="Email Address" Icon={MailOutlinedIcon} onChange={onChange} checked={isValid}/>
        <InputField autoComplete="password" label="Password" Icon={PasswordOutlinedIcon} onChange={onChange}/>
        <Button
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
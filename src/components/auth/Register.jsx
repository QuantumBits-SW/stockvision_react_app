import InputField from "./InputField";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import { useState, useMemo, useRef } from 'react';
import { emailRegex, passwordRegex } from "../../utils/validatorConstants";
import { Button } from "@mui/material";
import { signupUser, getUserProfile } from "../../services/loginService";


const Register = () => {
  // confirm password ref
  const ref = useRef(null);

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [validEntryStatus, setValidEntryStatus] = useState({
    firstName: false,
    lastName: false,
    password: false,
    confirmPassword: false,
    email: false
  })

  const isValid = useMemo(()=>(
    validEntryStatus.password && validEntryStatus.confirmPassword && validEntryStatus.email
  ), [validEntryStatus])

  const onChange = (e) => {
    const {name, value} = e.target;

    name === "Email Address" ? setRegisterData((registerData) => ({
      ...registerData,
      email: value
    })) : name === "Name" ? setRegisterData((registerData) => ({
      ...registerData,
      firstName: value
    })) : name === "Surname" ? setRegisterData((registerData) => ({
      ...registerData,
      lastName: value
    })) : name === "Password" ? function(){
        ref.current.querySelector("input").value = ''
        setRegisterData((registerData) => ({
        ...registerData,
        password: value,
        confirmPassword: ''
      }))}() : name === "Confirm Password" ? setRegisterData((registerData) => ({
      ...registerData,
      confirmPassword: value
    })) : null

    updateValidations(name, value);
  }

  const updateValidations = (name, value) => {
    name === "Name" ? setValidEntryStatus((validEntryStatus) => ({
      ...validEntryStatus,
      firstName: value.length >= 2 
    })) : name === "Surname" ? setValidEntryStatus((validEntryStatus) => ({
      ...validEntryStatus,
      lastName: value.length >= 2 
    })) : name === "Email Address" ? function(){
      const status = emailRegex.test(value)
      setValidEntryStatus((validEntryStatus) => ({
      ...validEntryStatus,
      email: status 
    }))}() : name === "Password" ? function(){
      const status = passwordRegex.test(value)
      setValidEntryStatus((validEntryStatus) => ({
      ...validEntryStatus,
      password: status,
      confirmPassword: false
    }))}() : name === "Confirm Password" ? setValidEntryStatus((validEntryStatus) => ({
      ...validEntryStatus,
      confirmPassword: value !== '' && registerData.password === value
    })) : null
  }

  const handleSignup = async (e) => 
  {
    e.preventDefault();
    try {
          const token = await signupUser(registerData.email, registerData.password);
          const userData = await getUserProfile(token, {...registerData, "isNewUser": true});
          console.log("User Data:", userData);
        } catch (err) {
          console.error("Error during Sign up process:", err);
        }
  }
 
  return ( 
    <div className="flex flex-col justify-center animate-slideInFromRight overflow-hidden animate-slideInFromLeft">
    <form className="overflow-hidden">
        <span className="flex flex-row w-[100%] gap-1">
          <InputField autoComplete="off" label="Name" Icon={PersonPinOutlinedIcon} onChange={onChange} checked={validEntryStatus.firstName}/>
          <InputField autoComplete="off" label="Surname" Icon={Groups3OutlinedIcon} onChange={onChange} checked={validEntryStatus.lastName}/>
        </span>
        <InputField autoComplete="email" label="Email Address" Icon={MailOutlinedIcon} onChange={onChange} checked={validEntryStatus.email}/>
        <InputField autoComplete="password" label="Password" Icon={PasswordOutlinedIcon} onChange={onChange} checked={validEntryStatus.password}/>
        <InputField ref={ref} autoComplete="off" label="Confirm Password" Icon={KeyOutlinedIcon} onChange={onChange} checked={validEntryStatus.confirmPassword}/>
        <Button
          type = "submit"
          variant="contained"
          className={`!rounded-[30px] w-full !mt-2 !p-2 text-white cursor-pointer ${isValid && "!bg-black"}`}
          disabled={!(isValid)}
          sx={{
            '&.MuiButton-root': {
              '&.Mui-disabled': {
                backgroundColor: "rgba(0, 0, 0, 0.2) !important"
              }
            }
          }}
        >
          Submit
        </Button>
    </form>
  </div>
  )
}

export default Register;

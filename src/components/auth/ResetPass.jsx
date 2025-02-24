import { Button } from "@mui/material";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputField from "./InputField";
import { useState } from "react";
import { emailRegex } from "../../utils/validatorConstants";
import { resetPassword } from "../../services/firebaseAuth";

const ResetPass = () => {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value)
    emailRegex.test(email) ? setIsValid(true) : setIsValid(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(email)
      console.log(res)
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="flex flex-col justify-center animate-slideInFromRight">
    <form onSubmit={handleSubmit}>
        <InputField autoComplete="off" label="Email Address" Icon={MailOutlinedIcon} onChange={onChange} checked={isValid}/>
        <Button
          type="submit"
          variant="contained"
          className={`!rounded-[30px] w-full !mt-2 !p-2 text-white cursor-pointer ${(isValid) && "!bg-black"}`}
          disabled={!(isValid)}
          sx={{
            '&.MuiButton-root': {
              '&.Mui-disabled': {
                backgroundColor: "rgba(0, 0, 0, 0.2) !important"
              }
            }
          }}
        >
          Send Reset Email
        </Button>
    </form>
  </div>
  )
}

export default ResetPass;
import InputField from "./InputField";

const Register = () => {
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

export default Register;

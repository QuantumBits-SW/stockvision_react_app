import { closeAuth } from "../../store/slices/popperSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import rightImg from "../../assets/images/auth/img1.png";
import { Button, IconButton } from '@mui/material';
import Login from "./Login";
import Register from "./Register";
import ResetPass from "./ResetPass";
import { useState } from "react";
import { Google } from "@mui/icons-material";
import { loginWithGoogle } from "../../services/loginService";


const Layout = () => {
  const authPopper = useSelector((state) => state.popper.authPopper);
  const initialState = {
    login: 1,
    register: 0,
    forgetPass: 0
  }
  const [authState, setAuthState] = useState(initialState)
  const dispatch = useDispatch();

  const resetState = () => {
    setAuthState(initialState)
  }

  const handleLoginWithGoogle = async()=>{
    try {
    const userData = await loginWithGoogle();
    console.log(userData);
  } catch (err) {
    console.error("Error during login with google process:", err);
  }
  }
  return (
    authPopper === 1 &&
    <div className="absolute flex items-center justify-center z-[999] top-0 backdrop-blur-xs  w-screen h-screen bg-black/20">
      <div className="flex justify-start flex-row w-[90vw] md:w-[90vw] lg:w-[70vw] h-fit max-h-[800px] bg-white rounded-3xl overflow-hidden">
        <div id="left" className={`flex-1 w-auto p-5 flex flex-col justify-center gap-6 md:gap-4`} >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Hi there 👋 
            </h1>
          </div>
          <div className="relative mx-auto bg-black/20 rounded-[30px] w-3/4 flex flex-row justify-around align-center">
            <div className={`z-1 bg-white !inline m-1 p-2 w-[48%] rounded-[30px] absolute h-[83%]
            ${authState.login === 1 ? 'translate-x-[-50%] md:translate-x-[-48%] xl:translate-x-[-50%]' : authState.register === 1 ? 'translate-x-[50%] md:translate-x-[48%] xl:translate-x-[50%]' : 'translate-x-[-100%]'}
            transition-all duration-[1s] ease-in-out`} />
            <button className={`z-3 m-1 p-2 w-2/4 rounded-[30px] cursor-pointer
            ${authState.login === 1 ? 'text-black' : 'text-black/50'}`} 
            onClick={() => setAuthState({
              login: 1,
              register: 0,
              forgetPass: 0
            })}>
              Signin
            </button>
            <button className={`z-3 m-1 p-2 w-2/4 rounded-[30px] cursor-pointer
            ${authState.register === 1 ? 'text-black' : 'text-black/50'}`}
              onClick={() => setAuthState({
                login: 0,
                register: 1,
                forgetPass: 0
              })}>
              Signup
            </button>
          </div>
          {
            authState.login === 1 ? <Login /> : 
            authState.register === 1 ? <Register /> :
            authState.forgetPass === 1 ? <ResetPass /> : null
          }
          <div className="h-[10%]">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-2">
              <IconButton className="border border-gray-300 rounded-lg p-3" onClick={handleLoginWithGoogle}>
                <Google className="text-gray-600" />
              </IconButton>
            </div>
          </div>
        </div>
        <div id="right" className="md:flex-1 relative flex w-auto items-center">
          <Button onClick={() => {
            resetState()
            dispatch(closeAuth())
          }} sx={{
            display: 'inline',
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1,
            background: 'white',
            borderRadius: '50px',
            minWidth: 0,
            width: 'fit-content',
            '&:hover': {
              background: 'oklch(0.623 0.214 259.815)',
              color: 'white'
            }
          }}>
            <CloseIcon fontSize="medium"/>
          </Button> 
          <img src={rightImg} className="hidden md:block h-full object-cover"/>
        </div>
      </div>
    </div>
  )
}

export default Layout;

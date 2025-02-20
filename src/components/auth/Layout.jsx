import { closeAuth } from "../../store/slices/popperSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import rightImg from "../../assets/images/auth/img1.png";
import { Button, IconButton } from '@mui/material';
import Login from "./Login";
import { useState } from "react";
import { Google } from "@mui/icons-material";

const Layout = () => {
  const authPopper = useSelector((state) => state.popper.authPopper);
  const [authState, setAuthState] = useState({
    login: 1,
    register: 0,
    forgetPass: 0
  })
  const dispatch = useDispatch();

  return (
    authPopper === 1 &&
    <div className="absolute flex items-center justify-center z-[999] top-0 backdrop-blur-xs  w-screen h-screen bg-black/20">
      <div className="flex justify-start flex-row w-[50vw] h-[60vh] bg-white rounded-3xl overflow-hidden">
        <div id="left" className="w-[50%] p-5 flex flex-col justify-center gap-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Hi there 👋 
            </h1>
          </div>
          <div className="mx-auto bg-black/20 rounded-[30px] w-3/4 flex flex-row justify-around align-center">
            <button className="bg-white m-1 p-2 w-2/4 rounded-[30px]">
              Signin
            </button>
            <button className="m-1 p-2 w-2/4 rounded-[30px] text-black/50">
              Signup
            </button>
          </div>
          {
            authState.login === 1 ? <Login /> : 
            authState.register === 1 ? <Register /> :
            authState.forgetPass === 1 ? <ResetPass /> : null
          }
          <div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-2">
              <IconButton className="border border-gray-300 rounded-lg p-3">
                <Google className="text-gray-600" />
              </IconButton>
            </div>
          </div>
        </div>
        <div id="right" className="relative">
          <Button onClick={() => dispatch(closeAuth())} sx={{
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
          <img src={rightImg} className="w-[25vw] h-full object-cover"/>
        </div>
      </div>
    </div>
  )
}

export default Layout;

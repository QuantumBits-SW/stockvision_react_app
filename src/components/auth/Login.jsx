import { closeAuth } from "../../store/slices/popperSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import rightImg from "../../assets/images/auth/img1.png";
import { TextField, Button, IconButton } from '@mui/material';
import { Google } from '@mui/icons-material';

const Login = () => {
  const authPopper = useSelector((state) => state.popper.authPopper);
  const dispatch = useDispatch();

  return (
    authPopper === 1 &&
    <div className="absolute flex items-center justify-center z-[999] top-0 backdrop-blur-xs  w-screen h-screen bg-black/20">
      <div className="flex justify-start flex-row w-[50vw] h-[60vh] bg-white rounded-3xl overflow-hidden">
        <div id="left" className="w-[50%] p-5">
            <div className="flex flex-col items-center justify-center text-center h-full">

              <div className="mb-10">
                <h1 className="text-2xl font-bold text-gray-900">
                  Hi there 👋 
                </h1>
              </div>

            <div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 ">Sign In</h2>
                
                <form>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    autoComplete="email"
                    className="mb-4"
                    InputProps={{
                      className: "rounded-lg bg-gray-50 mb-2",
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    className="mb-6"
                    InputProps={{
                      className: "rounded-lg bg-gray-50 mb-2",
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-2"
                  >
                    Continue
                  </Button>
                </form>
              </div>
              <div className="mt-3">
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

export default Login;

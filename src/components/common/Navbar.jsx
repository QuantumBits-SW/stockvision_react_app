import { Typography, Button } from "@mui/material";
import { openAuth } from "../../store/slices/popperSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-[90vw] mx-auto bg-slate-400/15 mt-[20px] rounded-[5rem] p-[1%] backdrop-blur-xs">
        <Typography variant="body" sx={{
          paddingLeft: '20px',
          fontSize: '25px',
          fontWeight: '500'
        }}>
          <em>Stock
            <span className="text-blue-500"> 
              Vision
            </span>
            </em>
        </Typography>
        <div className='flex float-right'>
          <Button onClick={() => dispatch(openAuth())}>
            Login
          </Button>
        </div>
      </div>
    </>
  )
}

export default Navbar;

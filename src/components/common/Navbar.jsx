import { Typography, Button } from "@mui/material";
import { openAuth } from "../../store/slices/popperSlice";
import { useDispatch, useSelector  } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../services/firebaseAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async()=>{
      await logout();
      navigate("/");
    }
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
        {user ? (
          <>
            <Link to="/stocks">
              <Button>Equity</Button>
            </Link>
            <Link to="/holdings">
              <Button>Portfolio</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button onClick={() => dispatch(openAuth())}>
            Login
          </Button>)}
        </div>
      </div>
    </>
  )
}

export default Navbar;

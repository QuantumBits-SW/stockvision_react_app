import { Divider, TextField } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const InputField = ({ label, Icon, autoComplete, onChange, checked, ref }) => {
  return (
    <div className="group flex flex-row border-1 w-full border-black/20 rounded-[30px] px-4 gap-2 items-center mb-2 focus-within:border-black/70">
      <Icon className="text-sm text-center text-black/40 group-focus-within:text-black/70"/>
      <Divider orientation="vertical" variant="middle" flexItem />
      <TextField
        ref={ref}
        fullWidth
        label={label}
        autoComplete={autoComplete}
        onChange={onChange}
        name={label}
        slotProps={{
          input: {
            className: "!rounded-[30px] text-gray-700",
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            display: "flex !important",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBlock: "15px 10px",
            '& fieldset': {
              border: "none",
            }
          },
          '& .MuiOutlinedInput-input': {
            padding: "0 !important",
            marginTop: "5px",
            fontSize: "14px"
          },
          '& .MuiInputLabel-root': {
            "&.Mui-focused, &.MuiInputLabel-shrink": {
              transform: "translate(14px, 5px) scale(0.75) !important"
            },
            marginLeft: "-15px",
            fontSize: "14px"
          }
        }}
      />
      {checked &&
      <CheckRoundedIcon className="text-white bg-green-600 rounded-3xl !text-[28px] p-1"/>}
    </div>
  )
}

export default InputField;
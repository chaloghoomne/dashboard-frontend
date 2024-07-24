import React from 'react'
import { InputAdornment, TextField } from '@mui/material';



function Input({label,src,onChange,isValid,variant,className,containerClass,type,password,error,onClick,value}) {
  const handleKeyPress = (event) => {
    if (type === 'number') {
      const isValidKey =
        /^\d$/.test(event.key) ||
        ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key);
      if (!isValidKey) {
        event.preventDefault();
      }
    }
  };
  return (
   <div className={containerClass}>
    <TextField
    fullWidth
    id="fullWidth"
    error={error}
    variant={variant}
    label={label}
    onChange={onChange}
    value={value}
    style={{cusror:"pointer"}}
    type={type}
    InputLabelProps={{
      sx: {
        color: 'white',
      fontSize:'17px',
      
      },
    }}
    helperText={error ? error : ""}
    InputProps={{
      className:className,
      sx: {
        // color: '#212121',
        width:"100%",
        color:'black',
        border: '1px solid orange',
        fontSize: '14px',
        '&:focus': {
            outline: 'none',}
      },
      endAdornment:(
        <InputAdornment position ='end'>
          {password && <img style={{cursor:'pointer'}} src={src} alt={src}  className='w-5 h-4 lg:w-6 lg:h-4'onClick={onClick}/>}
        </InputAdornment>
      )
    }}
    onKeyPress={handleKeyPress}
    />
    
   </div>
  )
}

export default Input
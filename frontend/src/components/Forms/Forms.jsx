import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Forms.module.css"
const Forms = ({inputDetails,setInputDetails,loading,formText, buttonAction, isLogin}) => {

    
  const formInputHandler =(event)=>{
    const {name,value} = event.target;
    setInputDetails((prevInputDetails)=>{return {...prevInputDetails,[name]:value}});
}



  return (
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    className={styles.authBackground}
  >
    <Box className={styles.content} height="100%">
      <Stack spacing={2} className={styles.form}>
        <h2 className={styles.title}>{formText.heading}</h2>
      {!isLogin && (<> <TextField
          id="fullName"
          label="Full Name"
          variant="outlined"
          title="Full Name"
          name="fullName"
          onChange={(event)=>formInputHandler(event)}
          value={inputDetails.fullName}
          placeholder="Enter Full Name"
          fullWidth
        />
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          title="Username"
          name="userName"
          onChange={(event)=>formInputHandler(event)}
          value={inputDetails.userName}
          placeholder="Enter Username"
          helperText="UserName must be atleast 6 characters length"
          fullWidth
        /></>)}
         <TextField
          id="email"
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          onChange={(event)=>formInputHandler(event)}
          value={inputDetails.email}
          fullWidth
          placeholder="Enter Email Id"
        />
        <TextField
          id="password"
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          onChange={(event)=>formInputHandler(event)}
          value={inputDetails.password}
          helperText="Password must be atleast 8 characters length"
          fullWidth
          placeholder="Enter a password with minimum 8 characters"
        />
       {!isLogin && <TextField
          id="confirmPassword"
          variant="outlined"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={(event)=>formInputHandler(event)}
          value={inputDetails.confirmPassword}
          fullWidth
        />}
         { loading===false && (<Button variant="contained" onClick={buttonAction}>
         {formText.buttonText}
         </Button>)}
         {loading ===true && <CircularProgress className={styles.loadingSubmit}/>}
        <p className={styles.secondaryAction}>
        {formText.footer}{" "}
           <Link className={styles.link} to={formText.footerLink}>
           {formText.footerLinkText}
           </Link>
        </p>
      </Stack>
    </Box>
  </Box>
  )
}

export default Forms
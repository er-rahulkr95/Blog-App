import React from 'react'
import styles from './Hero.module.css';
import { Box } from '@mui/system';
const Hero = ({isDashBoard}) => {
  const fullName = localStorage.getItem("fullName")
  return (
    <Box className={styles.hero}>
                {isDashBoard ? (<p className={styles.heroHeading}>
                  Dear! <span className={styles.heroHighlight}>{fullName}</span>, Welcome To Your DashBoard.</p>)
                  :(<p className={styles.heroHeading}>
                  Best Place To Read About <span className={styles.heroHighlight}>New Technology</span>{" "}
                  Of The World
                </p>)}
    </Box>
  )
}

export default Hero
import React from 'react'
import styles from './Hero.module.css';
import { Box } from '@mui/system';
const Hero = () => {
  return (
    <Box className={styles.hero}>
                <p className={styles.heroHeading}>
                  Best Place To Read About <span className={styles.heroHighlight}>New Technology</span>{" "}
                  Of The World
                </p>
    </Box>
  )
}

export default Hero
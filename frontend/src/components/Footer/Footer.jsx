import React from 'react'
import styles from "./Footer.module.css"
import { Box } from '@mui/system'
const Footer = () => {
  return (
    <Box className={styles.footer}>
     <Box className={styles.footerTitle}>
        <h2>QBlogs</h2>
    </Box>
    <p className={styles.footerText}>
      QBlogs Is The Best Place To Read About New Technology Of The World
    </p>
  </Box>
  )
}

export default Footer
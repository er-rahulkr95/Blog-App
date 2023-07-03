import { Box} from '@mui/material'
import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostModificationButtons = ({id}) => {
    const navigate = useNavigate()
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
    <Box>
    <Button variant="outlined" color="success" onClick={()=>navigate(`/post/edit/${id}`)}>Edit</Button>
    </Box>
    <Box>
    <Button variant="contained" color='error' >Delete</Button>
    </Box>
</Box>

)
}

export default PostModificationButtons
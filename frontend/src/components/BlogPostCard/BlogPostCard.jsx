import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLike, removeLike } from '../../features/blogPost/blogPostAction';
import PostModificationButtons from '../PostModificationButtons/PostModificationButtons';



const BlogPostCard = ({
    id,
    title,
    subheader,
    image,
    comments,
    likes,
    postedBy,
    likesId,
    isDashBoard,
}) => {

   const userId = localStorage.getItem("userId")


  const dispatch = useDispatch();



    //add like
    const handleAddLike =  () => {
      dispatch(addLike({id,userId}))
    }



    //remove like
    const handleRemoveLike = () => {
      dispatch(removeLike({id,userId}))
    }

        
    return (
        <Card sx={{ maxWidth: 345, height:'100%', display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user avatar">
                        {postedBy[0]}
                    </Avatar>
                }

                title={title}
                subheader={subheader}

            />
            <Link to={`/post/${id}`}>

                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                />
            </Link>
            <CardActions >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box>

                        {
                            likesId.includes(userId) ?
                                <IconButton onClick={handleRemoveLike} aria-label="add to favorites">
                                    <FavoriteIcon sx={{ color: 'red' }} />
                                </IconButton>
                                :
                                <IconButton onClick={handleAddLike} aria-label="add to favorites">
                                    <FavoriteBorderIcon sx={{ color: 'red' }} />
                                </IconButton>
                        }

                        {likes} Like(s)
                    </Box>
                    <Box>
                        {comments}
                        <IconButton aria-label="comment">
                            <CommentIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardActions>
            {
              isDashBoard && (<CardActions>
                <PostModificationButtons id={id}/>
              </CardActions>)
            }
        </Card>
    );
}

export default BlogPostCard;
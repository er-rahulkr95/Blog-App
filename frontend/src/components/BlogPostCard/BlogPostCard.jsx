import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLike, removeLike } from '../../features/blogPost/blogPostAction';
import PostModificationButtons from '../PostModificationButtons/PostModificationButtons';
import { toast } from 'react-toastify';



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

    const navigate = useNavigate();
  const dispatch = useDispatch();



    //add like
    const handleAddLike =  () => {
        if(!localStorage.getItem("token")){
            toast.error("Please Login to Like/Dislike a Post")
        }else{
            dispatch(addLike({id,userId}))
        }
     
    }



    //remove like
    const handleRemoveLike = () => {
        if(!localStorage.getItem("token")){
            toast.error("Please Login to Like/Dislike a Post")
        }else{
            dispatch(removeLike({id,userId}))
        }
    }

        
    return (
        <Card sx={{ width:"100%", height:'100%', display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user avatar">
                        {postedBy[0]}
                    </Avatar>
                }
                titleTypographyProps={{ fontWeight:"bold" }}
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
                                <IconButton onClick={handleRemoveLike} disabled={isDashBoard ? true :false} aria-label="Dislike">
                                    <FavoriteIcon sx={{ color: 'red' }} />
                                </IconButton>
                                :
                                <IconButton onClick={handleAddLike} disabled={isDashBoard ? true :false} aria-label="Like">
                                    <FavoriteBorderIcon sx={{ color: 'red' }} />
                                </IconButton>
                        }

                        {likes} Like(s)
                    </Box>
                    <Box>
                    {comments}
                    <Link to={{pathname:`/post/${id}`, hash:"#comments"}}>
                        <IconButton aria-label="comment">
                            <CommentIcon />
                        </IconButton>
                        </Link>
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
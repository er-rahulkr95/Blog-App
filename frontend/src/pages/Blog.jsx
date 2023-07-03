import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Divider } from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import moment from 'moment';
import Loader from '../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { fetchPost } from '../features/blogPost/blogPostAction';
import NavBar from '../components/NavBar/NavBar';
import Comments from '../components/Comments/Comments';
import { display } from '@mui/system';

const socket = io('/', {
    reconnection: true
})


const Blog = () => {

  const userId = localStorage.getItem("userId")


  const dispatch = useDispatch();

  const { postContent,loading } = useSelector((state) => state.blog);


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentsRealTime, setCommentsRealTime] = useState([]);




    const { id } = useParams();

    //fetch single post
    const displaySinglePost = async () => {
          dispatch(fetchPost(id))
    }

    useEffect(() => {
        displaySinglePost();
    }, [])

    useEffect(() => {
        // console.log('SOCKET IO', socket);
        socket.on('new-comment', (newComment) => {
            setCommentsRealTime(newComment);
        })
    }, [])


    // add comment
    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/comment/post/${id}`, { comment });
            if (data.success === true) {
                setComment('');
                toast.success("comment added");
                //displaySinglePost();
                socket.emit('comment', data.post.comments);
            }
            //console.log("comment post", data.post)
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

        console.log(postContent)
    // let uiCommentUpdate = commentsRealTime.length > 0 ? commentsRealTime : postContent.comments;

    return (
        <>
            <NavBar />
            <Box sx={{ bgcolor: "#fafafa", display: 'flex', justifyContent: 'center', pt: 4, pb: 4, minHeight: "100vh" }}>
                {
                    !loading ? <Loader /> :
                        <>
                            <Card sx={{ width:"85%", height: '100%', display:"flex", flexDirection:"column" }} >
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {postContent && postContent.postedBy.fullName[0]}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={postContent.title}
                                    subheader={moment(postContent.createdAt).format('MMMM DD, YYYY')}
                                />
                                <CardMedia
                                    component="img"
                                    sx={{height:{md:"450px", sm:"100%"}}}
                                    image={postContent.image.url}
                                    alt={postContent.title}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <Box component='span' dangerouslySetInnerHTML={{ __html: postContent.content }}></Box>
                                    </Typography>
                                  
                                    {/* add coment list */}
                                    {
                                      postContent.comments.length === 0 ? '' :
                                            <Typography variant='h5' sx={{ pt: 3, mb: 2 }}>
                                                Comments:
                                            </Typography>
                                    }

                                    {/* {
                                        uiCommentUpdate.map(comment => (
                                            <Comments key={comment._id} name={comment.postedBy.name} text={comment.text} />

                                        ))
                                    } */}

                                    {
                                      userId ?
                                            <>
                                                <Box sx={{ mt:"1rem", pt:1, pl: 3, pb: 3, bgcolor: "#fafafa", borderTop:"0.5px solid #673de6" }}>
                                  
                                                   <Typography variant='h3' color="primary">Add your comment here!</Typography>
                                                        <TextareaAutosize
                                                            onChange={(e) => setComment(e.target.value)}
                                                            value={comment}
                                                            aria-label="minimum height"
                                                            minRows={5}
                                                            placeholder="Add a comment..."
                                                            style={{ width:"90%", padding: "10px" , border:"1.5px solid #673de6", borderRadius:"1rem" }}
                                                        />
                                                        <Box sx={{ pt: 1 }}>
                                                            <Button type='submit' variant='contained'>Comment</Button>
                                                        </Box>
                                                   
                                                </Box>
                                            </>
                                            : <>
                                                <Link to='/login'> Log In to add a comment</Link>
                                            </>
                                    }
                                </CardContent>
                            </Card>
                        </>
                }
            </Box>
            <Footer />
        </>
    );
}

export default Blog;
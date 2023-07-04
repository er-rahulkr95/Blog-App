import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';




import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button } from '@mui/material';

import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import moment from 'moment';
import Loader from '../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { addComments, fetchPost } from '../features/blogPost/blogPostAction';
import NavBar from '../components/NavBar/NavBar';
import Comments from '../components/Comments/Comments';
import { postComment } from '../features/blogPost/blogPostSlice';


const Blog = () => {

    const userId = localStorage.getItem("userId")

    const dispatch = useDispatch();

    const { postContent, loading, commentText, comments } = useSelector((state) => state.blog);


    const postedBy = localStorage.getItem("userId")
    const { id } = useParams();


    const displaySinglePost = () => {
        dispatch(fetchPost(id))
    }

    useEffect(() => {
        displaySinglePost();
    }, [])


    const handleComment = () => {
        dispatch(addComments({ id, postedBy, commentText }))
    }


    return (
        <>
            <NavBar hasHomeButton />
            <Box sx={{ bgcolor: "#fafafa", display: 'flex', justifyContent: 'center', pt: 4, pb: 4, minHeight: "100vh" }}>
                {
                    !loading ? <Loader /> :
                        <>
                            <Card sx={{ width: "85%", height: '100%', display: "flex", flexDirection: "column" }} >
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} >
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
                                    sx={{ height: { md: "450px", sm: "100%" } }}
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

                                    {
                                        postContent.comments.map(comment => (
                                            <Comments key={comment._id} name={comment.postedBy.fullName} text={comment.commentText} />

                                        ))
                                    }

                                    <Box sx={{ mt: "1rem", pt: 1, pl: 3, pb: 3, bgcolor: "#fafafa", borderTop: "0.5px solid #673de6" }}>
                                        {userId ? <>
                                            <Typography variant='h5' color="primary">Add your comment here!</Typography>
                                            <TextareaAutosize
                                                onChange={(e) => dispatch(postComment(e.target.value))}
                                                value={commentText}
                                                aria-label="minimum height"
                                                minRows={5}
                                                placeholder="Add a comment..."
                                                style={{ width: "90%", padding: "10px", border: "1.5px solid #673de6", borderRadius: "1rem" }}
                                            />
                                            <Box sx={{ pt: 1 }}>
                                                <Button variant='contained' onClick={() => handleComment()} >Comment</Button>
                                            </Box>
                                        </>
                                            :
                                            <>
                                                <Link to='/login'><Button variant='contained' color="primary">Log In to add a comment</Button></Link>
                                            </>}
                                    </Box>
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
import { useEffect } from "react";
import { Box, Button} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUsers } from "state";
import PostWidget from "scenes/widgets/PostWidget";
import UserWidget from "scenes/widgets/UserWidget";
import WidgetWrapper from "components/WidgetWrapper";
//import UserImage from "components/UserImage";

import Navbar from "scenes/navbar";
const REACT_APP_SERVER_URL = 'https://onlyfriends.cyclic.app';

const AdminPage = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const getPosts = async () => {
    const response = await fetch(`${REACT_APP_SERVER_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const deletePost = async (postId, token) => {
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}/posts/${postId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Post deleted successfully
        console.log("Post deleted successfully");
        dispatch(setPosts({ posts: posts.filter(post => post._id !== postId) }));
        // Optionally, you can update your UI or perform any other necessary actions
      } else {
        // Handle the error if the post deletion was unsuccessful
        const errorData = await response.json();
        console.log("Post deletion failed:", errorData.error);
        // Optionally, you can display an error message or perform any other necessary actions
      }
    } catch (error) {
      // Handle any network or other errors that occurred
      console.log("Error deleting post:", error.message);
      // Optionally, you can display an error message or perform any other necessary actions
    }
  };

  const deleteUser = async (userId, token) => {
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}/users/${userId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Post deleted successfully
        console.log("User deleted successfully");
        dispatch(setUsers({ users: users.filter(user => user._id !== userId) }));
        // Optionally, you can update your UI or perform any other necessary actions
      } else {
        // Handle the error if the post deletion was unsuccessful
        const errorData = await response.json();
        console.log("user deletion failed:", errorData.error);
        // Optionally, you can display an error message or perform any other necessary actions
      }
    } catch (error) {
      // Handle any network or other errors that occurred
      console.log("Error deleting user:", error.message);
      // Optionally, you can display an error message or perform any other necessary actions
    }
  };

  // const getUserPosts = async () => {
  //   const response = await fetch(
  //     `${REACT_APP_SERVER_URL}/posts/${userId}/posts`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  //   console.log("posts are yay big "+ posts.length)
  // };

  // useEffect(() => {
  //   if (isProfile) {
  //     getUserPosts();
  //   } else {
  //     getPosts();
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getallUsers = async () => {
    const response = await fetch(`${REACT_APP_SERVER_URL}/users/all`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data }));
   
  };

  useEffect(() => {
    getPosts();
    getallUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //if (!user) return null;
  const handleClick = async (postId) => {
    try {
      await deletePost(postId, token);
    } catch (error) {
      console.log("Error deleting post:", error.message);
    }
  };

  const handleDelUser = async (userId) => {
    try {
      await deleteUser(userId, token);
    } catch (error) {
      console.log("Error deleting User:", error.message);
    }
  };
 let formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney'})
  // {
  //   year: "numeric",
  //   month: "long",
  //   day: "2-digit",
  //   // timeStyle: 'long',
  //   //  timeZone: 'Australia/Sydney'
    
  // });


  return (
    <>
    <Navbar></Navbar>
    {users.length ? (
        <>
          {users.map((users) => (
             <WidgetWrapper sx={{ mx: 'auto', width: '40%', my:'10px', p: 0 }}>
            <span key={users._id}>
            <UserWidget userId={users._id} picturePath={users.picturePath} />
            <Button
                onClick={() => handleDelUser(users._id)}
            sx={{
              color: "#FFFFFF",
              mt:"1rem",
              ml:"0.5rem",
              backgroundColor: "#FF0000",
              borderRadius: "3rem",
              "&:hover":{
                cursor:"pointer",
                color:"#FF0000" ,
                backgroundColor: "#FFFFFF",
              }
            }}
          >
            DELETE USER
          </Button>
{/*              
              <UserImage image={users.picturePath} size="55px" />
            <h1>
              {users.firstName}
              </h1> */}
              </span>
              </WidgetWrapper>
          ))}
        </>
      ) : null}
      {posts.length ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            createdAt,
          }) => (
            <>
            <Box sx={{ mx: 'auto', width: '40%', my:0, p: 0 }}>
            <WidgetWrapper m="1rem 0">
            
              <PostWidget  
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                createdAt={createdAt}
              />
               <Button
               onClick={() => handleClick(_id)}
            sx={{
              color: "#FFFFFF",
              mt:"1rem",
              ml:"0.5rem",
              backgroundColor: "#FF0000",
              borderRadius: "3rem",
              "&:hover":{
                cursor:"pointer",
                color:"#FF0000" ,
                backgroundColor: "#FFFFFF",
              }
            }}
          >
            DELETE POST
          </Button>
             <h3>  <code>  Posted on</code>: {formatter.format(new Date(createdAt))} </h3>
              </WidgetWrapper>
              </Box>
             
            </>
          )
        )
      ) : null}
      
      
    </>
  );
};

export default AdminPage;

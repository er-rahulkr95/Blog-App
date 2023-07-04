import React from "react";
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { postImage } from "../../../features/blogPost/blogPostSlice";

const PostImage = () => {
  const dispatch = useDispatch();
  const { image } = useSelector((state) => state.blog);
  return (

    <Box border="2px dashed blue" sx={{ p: 1, height:"8rem"}}>
      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png,.webp,.svg"
        multiple={false}
        onDrop={(acceptedFiles) =>
          acceptedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              dispatch(postImage(reader.result));
            };
          })
        }
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Box
            {...getRootProps()}
            p="1rem"
            sx={{ height:"100%",
              "&:hover": { cursor: "pointer" },
              bgcolor: isDragActive ? "#cceffc" : "#fafafa",
            }}
          >
            <input name="banner" {...getInputProps()} />
            {isDragActive ? (
              <>
                <p style={{ textAlign: "center" }}>
                  <CloudUploadIcon sx={{ mr: 2 }} />
                </p>
                <p style={{ textAlign: "center", color:"black", fontSize: "12px" }}>
                  {" "}
                  Drop here!
                </p>
              </>
            ) : image === "" ? (
              <>
                <p style={{ textAlign: "center" }}>
                  <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                </p>
                <p style={{ textAlign: "center", fontSize: "12px" }}>
                  Drag and Drop here or click to choose
                </p>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <img
                      style={{ maxWidth: "15rem" }}
                      src={image}
                      alt=""
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
      </Dropzone>
    </Box>
 
  );
};

export default PostImage;

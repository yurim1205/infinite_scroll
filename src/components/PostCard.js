import React from "react";

const PostCard = ({post}) => {
    return(
        <div style={{padding: '10px', border: '1px solid #ccc', marginBottom: '10px'}}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    );
};

export default PostCard;
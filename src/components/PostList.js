import React from 'react'

const PostList = ({posts, onDelPost, openEditPost}) => (

	<ul className="">
    {
        posts.map(post => (
                        
            <li key={post.id} >
                <span>{post.title} -- {post.voteScore}</span>
                <button className="" onClick={()=>openEditPost(post)}
                >
                    Edit
                </button>
                <button 
                    className=""
                    onClick={() => onDelPost(post.id)}
                >
                    Delete
                </button>
            </li>
    ))}
    </ul>
)

export default PostList
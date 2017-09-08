import React from 'react'

const PostList = ({posts, onDelPost, openEditPost, onVotePost }) => (

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

                <button 
                    className=""
                    onClick={() => onVotePost(post.id, "upVote")}
                >
                    upVote
                </button>

                <button 
                    className=""
                    onClick={() => onVotePost(post.id, "downVote")}
                >
                    downVote
                </button>
            </li>
    ))}
    </ul>
)

export default PostList
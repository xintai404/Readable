import React from 'react'

const PostDetail = ({post, onDelPost, openEditPost, onVotePost }) => (


                        
            <div>
                <span>
                    {post.title} 
                </span>

                <span>Vote: {post.voteScore}</span>
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
            </div>
)

export default PostDetail
import React from 'react'
import {Link} from 'react-router-dom'
const PostDetail = ({post, onDelPost, openEditPost, onVotePost, showBody }) => (
    <li className="list-item">
        <Link to= {`/${post.category}/${post.id}`} className="link">
            {post.title} 
        </Link>

        <div >
            {showBody
            ?(
                <p>
                    {post.body}
                </p>
            )
            : ''
            }
        </div>
        <div >
            <p> 
                By&nbsp;
                <span className="author">
                    {post.author} 
                </span>

                <span>
                    Score ({post.voteScore})
                </span>

                {post.comments
                ?(  <span>
                        Comments ({post.comments.length})
                    </span>
                ): null}

            </p>
            <button className="" onClick={()=>openEditPost(post)}>
                Edit
            </button>
            <button 
                className=""
                onClick={() => onDelPost(post)}
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
    </li>
)

export default PostDetail
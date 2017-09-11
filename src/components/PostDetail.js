import React from 'react'
import {Link} from 'react-router-dom'
const PostDetail = ({post, onDelPost, openEditPost, onVotePost, showBody }) => (
    <li key={post.id} className="list-item">
                            <Link to= {`/${post.category}/${post.id}`} className="link">
                                {post.title} 
                            </Link>

                            <div >
                                <p> 
                                    By&nbsp;
                                    <span className="author">
                                         {post.author} 
                                    </span>
                                </p>
                                {showBody
                                ?(
                                    <p>
                                        {post.body}
                                    </p>
                                )
                                : ''
                                }
                                <p>
                                    <span>
                                        Score ({post.voteScore})
                                    </span>

                                    <span>
                                        Comments ({post.voteScore})
                                    </span>

                                </p>
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
                        </li>
)

export default PostDetail
import React from 'react'

const CommentList = ({comments, onDelComment, openEditComment, onVoteComment }) => (

	<ul className="">
    {
        comments.map(comment => (
                        
            <li key={comment.id} >
                <span>{comment.body} -- {comment.voteScore}</span>
                <button className="" onClick={()=>openEditComment(comment)}
                >
                    Edit
                </button>
                <button 
                    className=""
                    onClick={() => onDelComment(comment.id)}
                >
                    Delete
                </button>

                <button 
                    className=""
                    onClick={() => onVoteComment(comment.id, "upVote")}
                >
                    upVote
                </button>

                <button 
                    className=""
                    onClick={() => onVoteComment(comment.id, "downVote")}
                >
                    downVote
                </button>
            </li>
    ))}
    </ul>
)

export default CommentList
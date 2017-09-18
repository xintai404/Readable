import React from 'react'
import {Link} from 'react-router-dom'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton'
import Favorite from 'material-ui/svg-icons/action/favorite'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Del from 'material-ui/svg-icons/action/delete'
import Comment from 'material-ui/svg-icons/communication/comment' 

const badgeStyle = {
    fontSize: 12,
    width: "14px", 
    height: "14px",
    top: "13px"
}

const iconStyle={
    width: "18px", 
    height: "18px"
}
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
            <div>    
                By&nbsp;
                <span className="author">
                    {post.author} 
                </span>

                <Badge
                    badgeContent={post.voteScore}
                    primary={true}
                    badgeStyle={badgeStyle}
                >
                    <Favorite style={iconStyle}/>
                </Badge>

                {post.comments
                ?(  <Badge
                        badgeContent={post.comments.length}
                        primary={true}
                        badgeStyle={badgeStyle}
                    >
                        <Comment style={iconStyle}/>
                    </Badge>
                ): null}

            </div>
            <IconButton 
                tooltip="Edit Post"
                iconClassName="" onClick={()=>openEditPost(post)}>
                <Edit />
            </IconButton>
            <IconButton 
                tooltip="Delete Post"
                iconClassName=""
                onClick={() => onDelPost(post)}
            >
                <Del />
            </IconButton>

            <IconButton 
                tooltip="Upvote Post"
                iconClassName=""
                onClick={() => onVotePost(post.id, "upVote")}
            >
                <ThumbUp />
            </IconButton>

            <IconButton 
                tooltip="Downvote Post"
                iconClassName=""
                onClick={() => onVotePost(post.id, "downVote")}
            >
                <ThumbDown />
            </IconButton>
         </div>
    </li>
)

export default PostDetail
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
    fetchComments,
    orderComments, 
    asyncAddComment,
    asyncDelComment,
    asyncEditComment,
    asyncVoteComment,
    isNeedToFetchAllPosts
} from '../actions'

import Modal from 'react-modal'
import Picker from './Picker'
import CommentList from './CommentList'
import PostList from './PostList'
import {getUID} from '../utils/helper'

class PostView extends Component {

    constructor(props){
        super(props)
        this.dispatch = props.dispatch
    }

    componentDidMount(){
        this.dispatch(isNeedToFetchAllPosts())
        this.dispatch(fetchComments(this.props.postId))   
        this.dispatch(orderComments('voteScore'))
    }

  render() {
    const {postId, posts} = this.props;
    return (
        <div className="container">
            
            <h3>Post</h3>
            <PostList posts={posts}/>
            <h3>Comments</h3>
            <CommentList postId={postId}/>
        </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
    const {posts} = state
    const postId = ownProps.match.params.postId
    return {
        postId,
        posts: posts.items.filter(post => postId === post.id)
    }
}

export default connect(
  mapStateToProps
)(PostView);
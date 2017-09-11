import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
    fetchComments,
    orderComments, 
    isNeedToFetchAllPosts
} from '../actions'

import CommentList from './CommentList'
import PostList from './PostList'

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
                <PostList posts={posts} 
                    showBody={true}
                />
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
        posts: [posts.byId[postId]]
    }
}

export default connect(
    mapStateToProps
)(PostView);
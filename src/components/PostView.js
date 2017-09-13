import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { 
    fetchComments,
    orderComments, 
} from '../actions/commentActions'

import {
    isNeedToFetchAllPosts
} from '../actions/postActions'

import CommentList from './CommentList'
import PostList from './PostList'
import NotFound from './NotFound'

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
        const {postId, posts, selectCategory} = this.props;
        return (
            <div className="container">
                {posts.length
                ? (
                    <div>
                        <h3>Post</h3>
                        <PostList posts={posts} 
                            showBody={true}
                        />
                        <h3>Comments</h3>
                        <CommentList postId={postId}/>
                        Link to: &nbsp;
                        <Link to={`/`} className="link">Main Page</Link> 
                        &nbsp;/&nbsp;
                        <Link to={`/${selectCategory}`} className="link" style={{"paddingLeft":"0px"}}>{selectCategory} </Link>
                    </div>
                 )
                : (<NotFound />)
                }
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const {posts} = state
    const postId = ownProps.match.params.postId
    const selectCategory = ownProps.match.params.selectCategory
    return {
        postId,
        selectCategory,
        posts: posts.byId[postId] ? [posts.byId[postId]] : []
    }
}

export default connect(
    mapStateToProps
)(PostView);
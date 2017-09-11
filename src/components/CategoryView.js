import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
    selectCategory,
    isNeedToFetchAllPosts
} from '../actions'

import PostList from './PostList'

class Category extends Component {

    constructor(props){
        super()
        this.dispatch = props.dispatch
    }

    componentDidMount(){
        this.dispatch(isNeedToFetchAllPosts())
        this.dispatch(selectCategory(this.props.selectCategory))   
    }

    render() {
        const {selectCategory, posts} = this.props;
        return (
            <div className="container">
                <h3>{selectCategory}</h3>
                

                <h3>Posts</h3>

                <PostList 
                    posts={posts}
                    showBody={true}
                />
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const {posts } = state
    return {
        selectCategory: ownProps.match.params.selectCategory,
        posts: Object.keys(posts.byId).map(id=> posts.byId[id])
    }
}

export default connect(
    mapStateToProps
)(Category);
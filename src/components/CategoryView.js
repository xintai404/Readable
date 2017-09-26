import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { 
    selectCategory,
    isNeedToFetchAllPosts,
    isNeedToFetchCategories
} from '../actions/postActions'

import PostList from './PostList'

export class Category extends Component {

    constructor(props){
        super()
        this.dispatch = props.dispatch
    }

    componentDidMount(){
        this.dispatch(isNeedToFetchAllPosts())
        this.dispatch(isNeedToFetchCategories())
        this.dispatch(selectCategory(this.props.selectCategory))   
    }

    render() {
        const {selectCategory, posts} = this.props;
        const filteredPosts = posts.filter(post => post.category === selectCategory)
        return (
            <div className="container">
                <h3>{selectCategory}</h3>
                

                <h3>Posts</h3>

                <PostList 
                    posts={filteredPosts}
                    showHeader={true}
                />
                Link to: <Link to={`/`} className="link">Main Page</Link>
            </div>
        )
    }
}


const mapStateToProps = ({posts}, ownProps) => {
    return {
        selectCategory: ownProps.match.params.selectCategory,
        posts: Object.keys(posts.byId).map(id=> posts.byId[id])
    }
}

export default connect(
    mapStateToProps
)(Category);
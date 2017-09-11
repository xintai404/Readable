import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { 
    fetchAllPosts, 
    fetchCategories,
} from '../actions'
import PostList from './PostList'

class App extends Component {
    constructor(props){
        super()
        this.dispatch = props.dispatch
    }

    componentDidMount(){
        this.dispatch(fetchCategories())   
        this.dispatch(fetchAllPosts())
    }

    render() {
        const {categories, posts} = this.props;
        return (
            <div className="container">
                <h3>Categories</h3>
                <div className="">
                    <ul className="list">
                        {categories.map((category,index) => (
                            <li key={index}>
                                <Link to={`/${category}`} className="link"> {category} </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <h3>Posts</h3>

                <PostList  
                    posts={posts}
                    showHeader={true}
                />

  
            </div>
        )
    }

}


const mapStateToProps = state => {
    const {categories, posts} = state
    return {
        categories, 
        posts: Object.keys(posts.byId).map(id=> posts.byId[id])
    }
}

export default connect(
    mapStateToProps
)(App);
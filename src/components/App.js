import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchAllPosts, 
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
        const {categories} = this.props;
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

                <PostList  />
  
            </div>
        )
    }

}


const mapStateToProps = state => {
    const {categories} = state
    return {
        categories, 
    }
}

export default connect(
    mapStateToProps
)(App);
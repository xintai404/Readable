import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllPosts, fetchCategories} from '../actions'


class App extends Component {
    constructor(){
        super()
    }

  componentDidMount(){
    const {dispatch} = this.props
        // if(this.categories){
        //   Promise.all(this.categories.map(category=>{
        //     return dispatch(fetchPosts(category))
        //   }))
        // }
        
    dispatch(fetchCategories())
    dispatch(fetchAllPosts())
  }

  render() {
    const {categories, posts} = this.props;

    return (
        <div className="content">
            <h3>Categories</h3>
            <div className="categories-list">
                <ul className="">
                    {categories.map((category,index) => (
                        <li key={index}>
                            <p> {category} </p>
                        </li>
                    ))}
                </ul>
            </div>

            <h3>Posts</h3>
            <div className="posts-list">
                <span>Order By: </span>
                <select onChange={e => console.log(e.target.value)}>
                    <option>voteScore</option>
                    <option>timestamp</option>
                </select>
                {posts.map(post => (
                    <ul key={post.id}>
                        <li key={post.id}>

                            <span>{post.title} -- {post.voteScore}</span>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
  }
}


const mapStateToProps = state => {

  const {posts, categories, selectCategory} = state
  


  return {selectCategory, categories, posts}
}

export default connect(
  mapStateToProps
)(App);
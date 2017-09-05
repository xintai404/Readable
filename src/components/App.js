import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllPosts, fetchCategories, orderPosts} from '../actions'


class App extends Component {
    constructor(props){
        super()
        this.dispatch = props.dispatch
    }

  componentDidMount(){
    
    this.dispatch(fetchCategories())
    this.dispatch(fetchAllPosts())
  }

  onSortPosts(order){
    console.log('order by ', order)
    this.dispatch(orderPosts(order))
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
                <select onChange={e => this.onSortPosts(e.target.value)} >
                    <option value="voteScore" >voteScore</option>
                    <option value="timestamp">timestamp</option>
                </select>
                <ul className="">
                    {posts.map(post => (
                        <li key={post.id} >
                            <span>{post.title} -- {post.voteScore}</span>
                            <button className="">Edit </button>
                            <button className="">Delete</button>
                        </li>
                    ))}
                </ul>
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
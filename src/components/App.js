import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions'


class App extends Component {
  constructor(){
    super()
    this.categories = ['react', 'redux', 'udacity']
  }

  componentDidMount(){
    const {dispatch} = this.props
    if(this.categories){
      Promise.all(this.categories.map(category=>{
        return dispatch(fetchPosts(category))
      }))
    }
  }

  render() {
    const {selectCategory, postsByCategory} = this.props;

    return (
      <div className="content">
        <h3>Category</h3>
        <div className="category-list">
          {Object.keys(postsByCategory).map(key => (
            <ul key={key}>
              {key}
              {postsByCategory[key].map(post => (

                <li key={post.id}>
                  <p> {post.id} </p>
                  <span>{post.title} -- {post.voteScore}</span>
                </li>
              ))}

            </ul>
          ))}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {

  const {postsByCategory, selectCategory} = state
  


  return {selectCategory, postsByCategory}
}

export default connect(
  mapStateToProps
)(App);
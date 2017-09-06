import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import { fetchAllPosts, 
        fetchCategories,
        orderPosts, 
        asyncAddPost,
        asyncDelPost
} from '../actions'
import Picker from './Picker'
import {getUID} from '../utils/helper'

class App extends Component {
    constructor(props){
        super()
        this.dispatch = props.dispatch
        this.state = {
            editPostModalOpen: false,
            addPostModalOpen: false,
        }
        //bind function
        this.onSortPosts = this.onSortPosts.bind(this)
        this.onAddPost = this.onAddPost.bind(this)
        this.onDelPost = this.onDelPost.bind(this)

        this.closeAddPostModal = this.closeAddPostModal.bind(this)
    }

    componentDidMount(){
        
        this.dispatch(fetchCategories())   
        this.dispatch(fetchAllPosts())
    }

    closeAddPostModal(){
        this.setState({
            addPostModalOpen: false
        })
    }

    onSortPosts(order){
        this.dispatch(orderPosts(order))
    }

    onAddPost(){
        this.setState({
            addPostModalOpen: true
        })
        // let newPost = {
        //     id: getUID(),
        //     timestamp: Date.now(),
        //     title: 'fxxx',
        //     body: 'ssss',
        //     author: 'ck',
        //     category: 'react',
        //     voteScore: 1,
        //     deleted: false
        // }
        // this.dispatch(asyncAddPost(newPost))
    }

    onDelPost(id){
        console.log('del', id)
        this.dispatch(asyncDelPost(id))
    }

    render() {
        const {categories, posts, orderBy} = this.props;
        const sortOptions = ['voteScore', 'timestamp']
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
                    <button className="fr"
                        onClick={this.onAddPost}>
                        Add Post
                    </button>
                    <span>Order By: </span>
                    <Picker value = {orderBy} 
                            options={sortOptions}
                            onChange={this.onSortPosts} 
                    />
                    <ul className="">
                        {
                            posts.map(post => (
                            
                            <li key={post.id} >
                                <span>{post.title} -- {post.voteScore}</span>
                                <button className="" 
                                >
                                    Edit
                                </button>
                                <button 
                                    className=""
                                    onClick={() => this.onDelPost(post.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <ReactModal
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={this.state.addPostModalOpen}
                    onRequestClose={this.closeAddPostModal}
                    contentLabel="edit post" 
                >
                {
                  <div className ="edit-container">
                    <form className ="search-form" onSubmit={this.editPost}>
                         <input name="title" className="" placeholder="title"/>
                        <button type="submit" > submit </button>
                    </form>
                  </div>
                }

              <p><button onClick={this.closeAddPostModal}>Close</button></p>
            </ReactModal>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const {posts, categories, selectCategory} = state
    return {
        selectCategory, 
        categories, 
        'posts': posts.items,
        'orderBy': posts.orderBy
    }
}

export default connect(
    mapStateToProps
)(App);
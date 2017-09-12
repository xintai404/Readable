import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Picker from './Picker'
import PostDetail from './PostDetail'
import { 
        orderPosts,
        asyncAddPost,
        asyncDelPost,
        asyncEditPost,
        asyncVotePost,
} from '../actions'

import {getUID} from '../utils/helper'

class PostList extends Component {
    state = {
        addPostModalOpen: false,
        editPostModalOpen: false,
        post: {}
    }

    constructor(props){
        super(props)
        this.dispatch = props.dispatch

        this.onSortPosts = this.onSortPosts.bind(this)
        this.onAddPost = this.onAddPost.bind(this)
        this.openAddPost = this.openAddPost.bind(this)
        this.openEditPost = this.openEditPost.bind(this)
        this.closeAddPost = this.closeAddPost.bind(this)
        this.closeEditPost = this.closeEditPost.bind(this)
        this.onDelPost = this.onDelPost.bind(this)
        this.onEditPost = this.onEditPost.bind(this)
        this.onVotePost = this.onVotePost.bind(this)
    }

    onSortPosts(order){
        this.dispatch(orderPosts(order))
    }

    openAddPost(){
        this.setState({
            addPostModalOpen: true
        })
    }

    openEditPost(post){
        this.setState({
            post: post,
            editPostModalOpen: true
        })
    } 

    onAddPost(e){
        e.preventDefault()
        this.setState({
            addPostModalOpen: false
        })
        let newPost = {
            id: getUID(),
            timestamp: Date.now(),
            title: this.form.title.value,
            body: this.form.body.value,
            author: this.form.author.value,
            category: this.form.category.value,
            voteScore: 1,
            deleted: false,
            parentDeleted: false
        }

        this.dispatch(asyncAddPost(newPost))
    } 

    onEditPost(e){
        e.preventDefault()
        let post = {
            ...this.state.post,
            body: this.form.body.value,
            title: this.form.title.value
        }

        this.setState({
            post: {},
            editPostModalOpen: false
        })
        this.dispatch(asyncEditPost(post))
    } 

    onDelPost(post){
        this.dispatch(asyncDelPost(post))
    } 

    onVotePost(id, vote){
        this.dispatch(asyncVotePost(id, vote))
    }

    closeAddPost(){
        this.setState({
            addPostModalOpen: false,
        })
        this.form = null
    }

    closeEditPost(){
        this.setState({
            editPostModalOpen:false,
            post: {}
        })
        this.form = null
    }

    render(){
        const {posts, orderBy, categories, showHeader} = this.props
        const {addPostModalOpen, editPostModalOpen, post} = this.state
        const sortOptions = ['voteScore', 'timestamp']

        return (
            <div>
                {showHeader
                ?   (<div className="list-header">
                        <button className="fr"
                            onClick={this.openAddPost}>
                            Add Post
                        </button>
                        <span>Order By: </span>
                        <Picker value = {orderBy} 
                                options={sortOptions}
                                onChange={this.onSortPosts} 
                        />
                    </div>)
                :null
                }
                <ul className="list">
                {
                    posts.map(post => post?(
                        <PostDetail key={post.id} 
                                    post={post}
                                    onDelPost={this.onDelPost}
                                    openEditPost={this.openEditPost}
                                    onVotePost={this.onVotePost} 
                                    showBody={!showHeader}
                        />
                    ) : null)
                }
                </ul>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={addPostModalOpen}
                    onRequestClose={this.closeAddPost}
                    contentLabel='Add Post'
                >
                    <div className="modal-content">
                        <h3> Add Post </h3>
                        <form name="addPostForm" className="" onSubmit={this.onAddPost} 
                            ref={(form) => this.form = form}>
                           
                            title: <input name="title"/> <br/>
                           
                            author: <input name="author"/> <br/>

                            category: 
                            <select name="category">
                              {categories.map(option =>
                                <option value={option} key={option}>
                                  {option}
                                </option>)
                              }
                            </select>
                            <br/>

                            body: <textarea name="body"/> <br/>
                            <button type="submit" >submit</button>
                        </form>
                    </div>

                </Modal>


                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={editPostModalOpen}
                    onRequestClose={this.closeEditPost}
                    contentLabel='Edit Post'
                >
                    <div className="modal-content">
                        <h3> Edit Post </h3>
                        <form name="editPostForm" className="" onSubmit={this.onEditPost}
                           ref={(form) => this.form = form}>
                           
                            title: <input name="title" defaultValue={post.title}/> <br/>

                            body: <textarea name="body" defaultValue={post.body}/> <br/>
                            <button type="submit" >submit</button>
                        </form>
                    </div>

                </Modal>
            </div>
        )
    }

}
// export default PostList
const mapStateToProps = state => {
    const {categories, posts, selectCategory} = state
    return {
        selectCategory, 
        categories, 
        'orderBy': posts.orderBy
    }
}

export default connect(
    mapStateToProps
)(PostList);

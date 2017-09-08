import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
    fetchComments,
    orderComments, 
    asyncAddComment,
    asyncDelComment,
    asyncEditComment,
    asyncVoteComment,
} from '../actions'

import Modal from 'react-modal'
import Picker from './Picker'
import CommentList from './CommentList'
import {getUID} from '../utils/helper'

class PostView extends Component {
    state = {
        addCommentModalOpen: false,
        editCommentModalOpen: false,
        comment: {}
    }
    constructor(props){
        super()
        this.dispatch = props.dispatch

        //bind function
        this.onSortComments = this.onSortComments.bind(this)
        this.onAddComment = this.onAddComment.bind(this)
        this.openAddComment = this.openAddComment.bind(this)
        this.openEditComment = this.openEditComment.bind(this)
        this.closeAddComment = this.closeAddComment.bind(this)
        this.closeEditComment = this.closeEditComment.bind(this)
        this.onDelComment = this.onDelComment.bind(this)
        this.onEditComment = this.onEditComment.bind(this)
        this.onVoteComment = this.onVoteComment.bind(this)
    }

    componentDidMount(){
        this.dispatch(fetchComments(this.props.postId))   
        this.dispatch(orderComments('voteScore'))
    }

    onSortComments(order){
        this.dispatch(orderComments(order))
    }

    openAddComment(){
        this.setState({
            addCommentModalOpen: true
        })
    }

    openEditComment(comment){
        this.setState({
            comment: comment,
            editCommentModalOpen: true
        })
    }

  onAddComment(e){
    e.preventDefault()
    this.setState({
        addCommentModalOpen: false
    })
    let newComment = {
        id: getUID(),
        parentId: this.props.postId,
        timestamp: Date.now(),
        body: this.form.body.value,
        author: this.form.author.value,
        voteScore: 1,
        deleted: false,
        parentDeleted: false
    }

    this.dispatch(asyncAddComment(newComment))
  }

  onEditComment(e){
    e.preventDefault()
    let comment = {
        ...this.state.comment,
        body: this.form.body.value,
        timestamp: Date.now()
    }

    this.setState({
        comment: {},
        editCommentModalOpen: false
    })
    this.dispatch(asyncEditComment(comment))
  }

  onDelComment(id){
    this.dispatch(asyncDelComment(id))
  }

  onVoteComment(id, vote){
    this.dispatch(asyncVoteComment(id, vote))
  }
  closeAddComment(){
    this.setState({
        addCommentModalOpen: false,
    })
    this.form = null
  }

  closeEditComment(){
    this.setState({
        editCommentModalOpen:false,
        comment: {}
    })
    this.form = null
  }

  render() {
    const {addCommentModalOpen, editCommentModalOpen, comment} = this.state
    const {selectCategory, comments, orderBy} = this.props;
    const sortOptions = ['voteScore', 'timestamp']
    return (
        <div className="container">
            <h3>{selectCategory}</h3>
            

            <h3>Comments</h3>
            <div className="posts-list">
                <button className="fr"
                    onClick={this.openAddComment}>
                    Add Comment
                </button>
                <span>Order By: </span>
                <Picker value = {orderBy} 
                        options={sortOptions}
                        onChange={this.onSortComments} 
                />
                <CommentList 
                    comments = {comments}
                    onDelComment = {this.onDelComment}
                    openEditComment = {this.openEditComment}
                    onVoteComment = {this.onVoteComment}
                />
            </div>

            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={addCommentModalOpen}
                onRequestClose={this.closeAddComment}
                contentLabel='Add Comment'
            >
                <div className="modal-content">
                    <h3> Add Comment </h3>
                    <form name="addCommentForm" className="" onSubmit={this.onAddComment} 
                        ref={(form) => this.form = form}>
                       
                        author: <input name="author"/> <br/>
                        body: <textarea name="body"/> <br/>
                        <button type="submit" >submit</button>
                    </form>
                </div>

            </Modal>


            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={editCommentModalOpen}
                onRequestClose={this.closeEditComment}
                contentLabel='Edit Comment'
            >
                <div className="modal-content">
                    <h3> Edit Comment </h3>
                    <form name="editCommentForm" className="" onSubmit={this.onEditComment}
                       ref={(form) => this.form = form}>

                        body: <textarea name="body" defaultValue={comment.body}/> <br/>
                        <button type="submit" >submit</button>
                    </form>
                </div>

            </Modal>
        </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const {comments, selectCategory} = state
  return {
    selectCategory: ownProps.match.params.selectCategory, 
    postId: ownProps.match.params.postId,
    'comments': comments.items,
    'orderBy': comments.orderBy}
}

export default connect(
  mapStateToProps
)(PostView);
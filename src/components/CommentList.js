import React, {Component} from 'react'
import {connect} from 'react-redux'
import { 
    orderComments, 
    asyncAddComment,
    asyncDelComment,
    asyncEditComment,
    asyncVoteComment,
} from '../actions'

import Modal from 'react-modal'
import Picker from './Picker'
import {getUID} from '../utils/helper'

class CommentList extends Component{
    state = {
        addCommentModalOpen: false,
        editCommentModalOpen: false,
        comment: {}
    }
    constructor(props){
        super(props)
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
    componentWillReceiveProps(nextProps) {
    // if (nextProps.comments.length !== this.props.comments.length) {
    //     console.log('comments length change')
    // }
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

  onDelComment(id, parentId){
    this.dispatch(asyncDelComment(id, parentId))
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
    const {comments, orderBy} = this.props;
    const sortOptions = ['voteScore', 'timestamp']
    return (
        <div>
        
            <div className="list-header">
                <button className="fr"
                    onClick={this.openAddComment}>
                    Add Comment
                </button>
                <span>Order By: </span>
                <Picker value = {orderBy} 
                        options={sortOptions}
                        onChange={this.onSortComments} 
                />
            </div>

                <ul className="list">
                {
                    comments.map(comment => 
                        comment?(
                                    
                            <li key={comment.id} className="list-item">
                                <p>
                                    {comment.body}
                                </p>
                                <p>
                                    By&nbsp;
                                    <span className="author">
                                        {comment.author? comment.author: 'anonymous'} 
                                    </span>

                                    <span>
                                        Score ({comment.voteScore})
                                    </span>

                                </p>
                                <button className="" onClick={()=>this.openEditComment(comment)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className=""
                                    onClick={() => this.onDelComment(comment.id, comment.parentId)}
                                >
                                    Delete
                                </button>

                                <button 
                                    className=""
                                    onClick={() => this.onVoteComment(comment.id, "upVote")}
                                >
                                    upVote
                                </button>

                                <button 
                                    className=""
                                    onClick={() => this.onVoteComment(comment.id, "downVote")}
                                >
                                    downVote
                                </button>
                            </li>
                        ) : null )
            }
            </ul>


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
    const {comments} = state
    return {
        'comments': Object.keys(comments.byId).map(id=> comments.byId[id]),
        'orderBy': comments.orderBy
    }
}

export default connect(
  mapStateToProps
)(CommentList);
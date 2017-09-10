import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
    selectCategory,
    isNeedToFetchAllPosts
} from '../actions'

import PostList from './PostList'

class Category extends Component {

    constructor(props){
        super()
        this.dispatch = props.dispatch
    }

    componentDidMount(){
        this.dispatch(isNeedToFetchAllPosts())
        this.dispatch(selectCategory(this.props.selectCategory))   
    }

    render() {
        const {selectCategory} = this.props;
        return (
            <div className="container">
                <h3>{selectCategory}</h3>
                

                <h3>Posts</h3>

                <PostList />
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        selectCategory: ownProps.match.params.selectCategory
    }
}

export default connect(
  mapStateToProps
)(Category);
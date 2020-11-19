import React, {Component} from 'react';
import axios from 'axios';
// import {connect} from 'react-redux';

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    // handle change
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // submit new post
    createPost = () => {
        const {title, img, content} = this.state
        axios
          .post(`/api/post`, {title, img, content})
          .then(() => this.props.history.push('/dashboard'))
          .catch(error => console.log(error));
    }

    render() {
    const {title, img, content} = this.state

      return (
        <div className='form-component'>
            <h1 className='form-new-post'>New Post</h1>
            
            <div className='form-title-input'>
                <h2>Title:</h2>
                <input 
                name='title'
                value={title} 
                onChange={e => this.changeHandler(e)}/>
            </div>
            <div className='form-img-input'>
                <img className='img' alt='img' src=''/>
                <h2>Image URL:</h2>
                <input
                name='img'
                value={img} 
                onChange={e => this.changeHandler(e)}/>
            </div>
            <div className='form-content-input'>
                <h2>Content:</h2>
                <input
                name='content'
                value={content} 
                onChange={e => this.changeHandler(e)}/>
            </div>
            <button className='form-post-button' onClick={this.createPost}>Post</button>
        </div>
      )
    }
  }

//   function mapStateToProps(state) {
//     return {
//       userId: state.userId
//     }
//   }
//   export default connect(mapStateToProps)(Form);

export default Form
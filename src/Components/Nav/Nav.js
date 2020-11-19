import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser, loginUser} from './../../ducks/reducer';
import axios from 'axios';
class Nav extends Component {
    // constructor(props){
    //     super(props);
    // }

    // componentDidMount(){
    //     this.props.getMe();
    // }

    componentDidMount(){
        axios.get('/api/auth/me')
          .then(res => {this.props.loginUser(res.data); console.log(res)})
          .catch(error => console.log(error))
    }

    // componentDidMount(){
    //     this.props.getMe();
    //   }

    logoutUser = () => {
        axios
          .post('/api/auth/logout')
          .then(res => this.props.logoutUser())
          .catch(error => console.log(error))
    }
      
    render(){
        return (
            <div className='nav-component'>
                <img src={this.props.profilePic} className='nav-profile-pic' alt="user profile"/>
                <div className='nav-username'>{this.props.username}</div>
                <div className='nav-buttons'>
                    <Link to='/dashboard'><p className='nav-home-button'>Home</p></Link>
                    <Link to='/new'><p className='nav-new-post-button'>New Post</p></Link>  
                </div>
                <div className='logout-button'>
                <Link to='/' onClick={this.logoutUser}><p>Logout</p></Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {logoutUser, loginUser})(Nav)
// export default withRouter(connect(mapStateToProps, {logoutUser}))(Nav)
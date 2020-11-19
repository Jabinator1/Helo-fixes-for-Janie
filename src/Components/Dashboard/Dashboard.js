import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';


class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            posts: [],
            myPosts: true
        }
    }

    // async componentDidMount (){
    //   const {data} = await axios.get('/api/post)
    //   this.setState({posts: data})
    // }
    // componentDidMount(){
    //   this.props.getMe();
    // }

    componentDidMount = () => {
      const {myPosts, search} = this.state
      axios.get(`/api/posts?myPosts=${myPosts}&search=${search}`)
        .then(res => this.setState({posts: res.data}))
        .catch(error => console.log(error))
    }

    reset = () => {
      axios.get(`/api/posts`)
        .then(res => this.setState({posts: res.data, search: ''}))
        .catch(error => console.log(error));
    }

    render() {
      const mappedPosts = this.state.posts.map((post) => {
        return <Link to={`/post/${post.post_id}`} 
                key={post.post_id}>
                <h1>{post.title}</h1>
                <p>by {post.username}</p>
                <img src={post.profile_pic} alt='profile'/>
                </Link>
      })

        return (
          <div className='dashboard-component'>
            <div className='dashboard-header'>
              <div className='dashboard-header-left'>
                <input 
                className='dashboard-search-box' 
                value={this.state.search} 
                onChange={e => this.setState({search: e.target.value})}
                placeholder='Search by Title'
                />

                <button onClick={this.getUserPosts} className='magnifying-glass-img'/>
            
                <button className="dashboard-reset-button" onClick={this.reset}>Reset</button>
              </div>

              <div className='dashboard-header-right'>
                <div className='dashboard-my-posts-title'>My Posts</div>
                <input className='dashboard-checkbox' type='checkbox' checked={this.state.myPosts} onChange={() => this.setState({myPosts: !this.state.myPosts}, this.getUserPosts)}/>
              </div>
            </div>
            
              {mappedPosts}

          </div>
  
        );
    }
  }

// function mapStateToProps(state) {
//   return {
//     userId: state.userId
//   }
// }
const mapStateToProps = state => state
export default connect(mapStateToProps)(Dashboard);

// export default Dashboard
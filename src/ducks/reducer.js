// import axios from 'axios'
const initialState = {
    username: '',
    userId: '',
    profilePic: '',
    isLoggedIn: false
}

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = 'LOGOUT_USER';
// const GET_ME = "GET_ME";


export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user 
    }
}

export function logoutUser() {
    return {
      type: LOGOUT_USER,
      payload: initialState
    }
}

// export function getMe(){
//     const user = axios.get('/api/auth/me')
//     .then(res => res.data) 
//     return {
//         type: GET_ME,
//         payload: user 
//     }
// }

export default function reducer(state = initialState, action) {
    switch(action.type){
        case LOGIN_USER:
            return {...state, userId: action.payload.userId, username: action.payload.username, profilePic: action.payload.profilePic, isLoggedIn: true}
        case LOGOUT_USER:
            return initialState; 
        // case GET_ME + '_PENDING':
        //     return state
        // case GET_ME + '_FULFILLED': 
        //     return {...state, username: action.payload.username, profilePic: action.payload.profile_pic, isLoggedIn: true}
        // case GET_ME + '_REJECTED':
        //     return initialState
        default:
            return state;
    }
}
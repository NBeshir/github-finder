import React,{useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {SEARCH_USERS,
 GET_USER,
 GET_USERS,
 GET_REPOS,
 SET_LOADING,
 SET_ALERT,
 REMOVE_ALERT, 
 CLEAR_USERS} from '../types';
let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret= process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else{
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret= process.env.GITHUB_CLIENT_SECRET;

}


 const GithubState = props =>{
     const initialState = {
            users:[],
            user:{},
            repos:[],
            loading:false
     }
     const [state, dispatch] = useReducer(GithubReducer, initialState);

     //search Users
     const searchUsers= async text =>{
        // const filtered = this.state.users.filter((user =>user.login.toUpperCase() === userLogin.toUpperCase()))
        //   this.setState({users:filtered})
        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
       
        
        dispatch({
            type:SEARCH_USERS,
            payload:res.data.items
        })
      
      }
      
      //get user
      const getUser = async (username)=>{
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        
       
        dispatch({
            type:GET_USER,
            payload:res.data
        })
      }
      //get repos
      const getUsersRepos= async(username)=>{
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
       
        dispatch({
          type:GET_REPOS,
          payload:res.data
      })
      }
      //clear users
      const clearUsers = ()=>dispatch(({type:CLEAR_USERS}))
        
        
      
      const setLoading=()=>dispatch({type:SET_LOADING})

      
      //alert
      // const showAlert=(msg,type)=>{
      //   setTimeout(
      //     dispatch({
      //       type:SET_ALERT,
      //       payload:{msg,type}
      //     })
      //   ),5000
       
          
  
      // };
   
     return <GithubContext.Provider
        value={{
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            searchUsers,
            getUser,
            getUsersRepos,
            clearUsers

        }}
     >
         {props.children}
     </GithubContext.Provider>
 }
 export default GithubState;
import React, { useContext } from 'react'

import UserItem from './UserItem';
import {UserData} from './Userdata';

import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
//import User from './components/users/User'
import {Link} from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const Users =()=>{
  
      const githubContext = useContext(GithubContext);

    const {loading,users} =githubContext;
   
    
       if(loading){
           return <Spinner/>
       }else{
        return(
            <div style={userStyle} >
                 {users.map(user=>{
               
               
              
                    
               return <UserItem key={user.id} user={user} />
                
                 })}
                    
             
               
            </div>
        )

       }
      
        
    }
  
    
const userStyle={
    display:'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap:'1rem'
}

export default Users

import React, { useState } from 'react'
import { PostItem } from '../../types'
import './Post.css'
import Axios from 'axios';
import { useAppSelector } from '../redux/Actions';
import SvgAddButton from '../assets/svg/SvgAddButton';


const api = 'http://localhost:9000'

export const Post: React.FC<PostItem> = ({ post, poster }) => {

  const selector = useAppSelector(state => state)
  const [trendPoints, setTrendPoints] = useState(post.trendPoints)

  const upvotePost = () => {
    const params = {
      userID: selector.user.userID
    }
    Axios.post(`${api}/post/upvote/${post.postID}`, params, {
      headers: { authorisation: `Bearer ${localStorage.getItem('token')}` } 
    }).then(res => {
      console.log(res)
      setTrendPoints(post.voted ? trendPoints - 1 : trendPoints + 1)
      post.voted = !post.voted
    })
  }

  return (
    <div className='post'>
      <div id='header' className='header'>
        <img src={'http://localhost:9000' + poster.profileImageUrl} alt='profile' className='postProfileImage'/>
        <div style={{flexDirection: 'column', display: 'flex', alignItems: 'start'}}>
          <span className='headerTextName'>{poster.name}</span>
          <span className='headerTextCompany'>{poster.company}</span>
          
        </div>
      </div>
      <div id='body' className='body'>
        <span className='bodyText'>{post.body}</span>
      </div>
      <div id='footer' className='footer'>
        <div className='upvoteButtonPill' onClick={() => upvotePost()}>
          <span style={{paddingLeft: 15, paddingRight: 10}}>{trendPoints}</span>
          <div className='upvoteButton'>
            <SvgAddButton height={30} fontVariant={post.voted ? 'hidden' : 'visible'} stroke={'#00FFA3'}/>
          </div>
        </div>
    <input color='#00FFA3' style={{backgroundColor: '#CCFFED', border: 0, height: 30, flex: 1, marginLeft: 15, borderRadius: 15, paddingLeft: 15}}  placeholder='comment something'/>
      </div>
    </div>
  )
}

// needs upvote button + image posts + post editor + comments)
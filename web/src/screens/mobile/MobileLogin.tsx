import Axios from 'axios'
import React, { useState } from 'react'
import '../../App.css';
import './MobileStyles.css';
import { API } from '../../constants';
import Hamster from '../../assets/svg/hamster';
import { useAppDispatch } from '../../redux/Actions';
import { setUser } from '../../redux/slices/userSlice';
import { Header } from '../../components/Header';

interface Props {
  setAuthenticated: any
}

const MobileLogin: React.FC<Props> = (props: Props) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const dispatch = useAppDispatch()

  const signUp = async () => {
    if (!email.match(/^[A-Za-z0-9]+\.+[A-Za-z0-9]+@chamonix\.com\.au$/)) {
      alert('invalid email format')
    }
    else if (password !== confirmPassword || password === '' || !password) {
      alert('passowrds no matchy');
    }
    else if (name === '' || email === '' || company === '') {
      alert('form must be filled!');
    } else {
      Axios.post(`${API}/user/signup`, {
        name: name,
        email: email,
        company: company,
        password: password
      }).then(res => {
        dispatch(setUser(res.data.user));
        props.setAuthenticated(true)
      }).catch(err => {
        alert(err)
      })
    }
  }

  const login = () => {
    if (!email.match(/^[A-Za-z0-9]+\.+[A-Za-z0-9]+@chamonix\.com\.au$/)) {
      alert('invalid email format')
    } else {
      Axios.post(`${API}/user/login`, {
        email: email,
        password: password
      }).then(res => {
        if (res.status !== 200) {
          alert('incorrect email or password')
        } else {
          localStorage.setItem('token', res.data.token)
        }
        dispatch(setUser(res.data.user));
        props.setAuthenticated(true)
      })
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (confirmPassword !== '') {
      signUp()
    } else {
      login()
    }
  }

  return (
    <div className="mobile">
      <Header type='mobile'/>
      <div style={{justifyContent: 'space-between', flexDirection: 'column', display: 'flex', marginTop: '2rem', marginBottom: '2rem'}}>
        <Hamster height={100} fill={'#5900B2'} />
        <span style={{color: '#5900B2', fontSize: 18, marginTop: 15}}>Welcome to frome_road</span>
      </div>
      <div className='body'>
        <form style={{width: '100%'}} onSubmit={onSubmit}>
          <div className='inputDiv'>
            <span className='label'>name</span>
            <input className='input' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='inputDiv'>
            <span className='label'>email</span>
            <input type={'email'} className='input' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='inputDiv'>
            <span className='label'>company</span>
            <input className='input' value={company} onChange={(e) => setCompany(e.target.value)}/>
          </div>
          <div className='inputDiv'>
            <span className='label'>password</span>
            <input type={'password'} className='input' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='inputDiv'>
            <span className='label'>confirm password</span>
            <input type={'password'} className='input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          <div className='buttonDiv'>
          <button className='button'>
              sign up
            </button>
          <button type='submit' className='button'>
              login
            </button>
          </div>
        </form>
        <div>
          <div className='aboutDiv'>
            <div className='titleDiv'>
              <p className='sectionTitle'>about</p>
              <hr className='line'/>
            </div>
            <span className='aboutText'>
              frome_road is a space for all employees of Lot Fourteen to discuss anything from tech to the weather.
            </span>
            <span className='aboutText'>
              The site is currently only available to employees of Chamonix.
            </span>
            <div className='titleDiv' style={{marginTop: '2rem'}}>
              <p className='sectionTitle'>creator</p>
              <hr className='line' />
            </div>
              <p className='aboutText' style={{marginTop: 0}}>I originally created this project as a way to get into full-stack devving.</p>
              <p className='aboutText'>The project stack is ReactJS, NodeJS, and MySQL, hosted on AWS Amplify, EC2, and Route 53.</p>
              <p className='aboutText'>I honestly have no idea if it'll work or how many bugs there'll be so please don't hesitate to report them.</p>
              <div style={{flexDirection: 'row', display: 'flex'}}>
                <p style={{ display: 'inline-block', marginTop: '1.5rem', textAlign: 'justify'}}>The <a href='https://github.com/fhllnd/fromeroad' rel="noreferrer" target={'_blank'}> Repo</a> should anyone care to fix said bugs</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileLogin

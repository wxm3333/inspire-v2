import Head from 'next/head'
import Jitsi from "react-jitsi";
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import NavBar from '../components/navbar'

function JitsiMeeting () {

	const [displayName, setDisplayName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [onCall, setOnCall] = useState(false);

	return (
    <>
      <h3>Upcoming Meeting</h3>
      <p>Room name: inspire-jitsi-test; Password: 123</p>
      <input
        className="form-input"
        type='text'
        placeholder='Room name'
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
      />
      <input
        className="form-input"
        type='text'
        placeholder='Your name'
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
      />
      <input 
        className="form-input"
        type='text'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => setOnCall(true)}
      >
        Join Meeting
      </Button>
      <Button
        variant="contained"
        onClick={() => setOnCall(false)}
      >
        End Meeting
      </Button>

      {onCall &&
        <Jitsi
          roomName={roomName}
          displayName={displayName}
          password={password}
          frameStyle={{ display:'block', width:'100%', height:'100%' }}
          containerStyle={{ width: '1200px', height: '600px' }}
          onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
        />}

      <style jsx>{`
        .form-input {
          border: 1px solid #BABACC;
          height: 32px;
          border-radius: 10px;
          padding: 0;
          box-sizing: border-box;
          font-size: 13px;
          color: #232323;
          padding: 0 12px;
          width: 200px;
          margin-right: 10px;
        }
      `}</style>
      </>
    )
}

export default function JitsiTab() {
  return (
    <>
      <Head>
        <title>Inspire</title>
        <link rel="icon" href="/jojo.png" />
      </Head>
      <NavBar />
      {JitsiMeeting()}
    </>
  )
}

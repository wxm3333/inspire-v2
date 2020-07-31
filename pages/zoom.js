import Head from 'next/head'
import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import NavBar from '../components/navbar'
import styles from './zoom.module.css'

function ZoomComponentFunction() {
	const [meetingLaunched, setMeetingLaunched] = useState(false);
	const [userName, setUserName] = useState('');
  const [meetingNumber, setMeetingNumber] = useState(3323927035);
  const [password, setPassword] = useState('6MQ1tr');
  const apiKey = "AhYE37g2RRm28aINKVnCfA";

  const zoomMeeting = document.getElementById("zmmtg-root")

	const joinZoomMeeting = () => {
    //setMeetingLaunched(!meetingLaunched);
    fetch("https://inspire-zoom.herokuapp.com/", {
      method: "POST",
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: 0
      }),
    })
    .then((result) => result.text())
    .then(
      (response) => {
        ZoomMtg.init({
          leaveUrl: "http://ec2-3-80-117-236.compute-1.amazonaws.com/zoom",
          isSupportAV: true,
          success() {
            ZoomMtg.join({
              meetingNumber: meetingNumber,
              userName: userName,
              signature: JSON.parse(response).signature,
              apiKey: apiKey,
              password: password,
              success() {
                console.log("join meeting success");
              },
              error(res1) {
                console.log(res1);
              },
            },);
          },
          error(res2) {
            console.log(res2);
          },
        });
      },
    );
    };

	useEffect(() => {
    ZoomMtg.setZoomJSLib("https://dmogdx0jrul3u.cloudfront.net/1.7.9/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    zoomMeeting.style.display = "none";
    joinZoomMeeting();
	},);

	return (
    <>
    {!meetingLaunched ? (
      <>
        <input
          className={styles.formInput}
          type="text"
          name="meetingNumber"
          placeholder="Meeting #"
          value={meetingNumber}
          onChange={e => setMeetingNumber(e.target.value)}
        />
        <input
          className={styles.formInput}
          type="text"
          name="userName"
          placeholder="Username"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          className={styles.formInput}
          type="text"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={() => this.joinZoomMeeting()}
        >
          Join Meeting
        </button>
      </>
    ) : (
      <></>
    )}
    </>
	);
};

const loadZoom = () => {
  ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.9/lib", "/av");
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  console.log('done preload zoom');
}

class ZoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingLaunched: false,
      meetingNumber: "",
      //leaveUrl: "http://localhost:3000",
      leaveUrl: "http://ec2-3-80-117-236.compute-1.amazonaws.com/",
      userName: "",
      userEmail: "",
      passWord: "",
      role: 0,
      tab: 0,
    };

  }

  componentDidMount() {
    const ZoomMtg = import("@zoomus/websdk");
    //const ZoomMtg = zoomsdk.ZoomMtg(); 
    console.log('did mount');
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.9/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    console.log('done mount');
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  launchMeeting = (r) => {
    const apiKey = "AhYE37g2RRm28aINKVnCfA";
    const meetConfig = {
      meetingNumber: this.state.meetingNumber,
      leaveUrl: this.state.leaveUrl,
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      passWord: this.state.passWord,
      role: r
    };
    this.setState({ role: r})
    this.setState({ meetingLaunched: true });
    this.getSignatureFromServer(meetConfig, apiKey);
  }

  getSignatureFromServer = (meetConfig, apiKey) => {
    fetch("https://inspire-zoom.herokuapp.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetConfig.meetingNumber,
        role: meetConfig.role
        })
    })
      .then(result => result.text())
      .then(response => {
        console.log(JSON.parse(response))
        ZoomMtg.init({
          debug: true,
          leaveUrl: meetConfig.leaveUrl,
          isSupportAV: true,
          success: function() {
            ZoomMtg.join({
              signature: JSON.parse(response).signature,
              apiKey: apiKey,
              meetingNumber: meetConfig.meetingNumber, // required
              userName: meetConfig.userName, // required
              userEmail: meetConfig.userEmail, // Not used, required for Webinars
              passWord: meetConfig.passWord, // If required; set by host
              success() {
                console.log("join meeting success");
              },
              error(res) {
                console.log(res);
              }
            });
          },
          error(res) {
            console.log(res);
          }
        });
      });
  }

  render() {
    const { meetingNumber, userName, passWord, meetingLaunched } = this.state;
    return (
      <div>
        <Card className="meeting-detail">
        <CardContent>
          <Typography variant="h5" component="h2">
            Upcoming Meeting:
          </Typography>
          <Typography variant="body">
            <br />
            Meeting #: 3323927035
            <br />
            Password: 6MQ1tr
          </Typography>
        </CardContent>
        </Card>
        {!meetingLaunched ? (
          <>
          <input
            className={styles.formInput}
            type="text"
            name="meetingNumber"
            placeholder="Meeting #"
            value={meetingNumber}
            onChange={this.handleInputChange}
          />
          <input
            className={styles.formInput}
            type="text"
            name="userName"
            placeholder="Username"
            value={userName}
            onChange={this.handleInputChange}
          />
          <input
            className={styles.formInput}
            type="text"
            name="passWord"
            placeholder="Password"
            value={passWord}
            onChange={this.handleInputChange}
          />
          <div className={styles.buttonWrapper}>
            <Button
              variant="contained"
              onClick={() => this.launchMeeting(1)}
              className={styles.meetingButton}
            >
              Host Meeting
            </Button>
            <Button
              variant="contained"
              onClick={() => this.launchMeeting(0)}
              className={styles.meetingButton}
            >
              Join Meeting
            </Button>
          </div>
          </>
        ) : (
          <></>
        )}
    </div>
    );
  }
}

export default function ZoomTab() {
  return (
    <>
      <Head>
        <title>Inspire</title>
        <link rel="icon" href="/jojo.png" />
      </Head>
      {console.log('test')}
      <NavBar />
      <ZoomComponent />
    </>
  )
}

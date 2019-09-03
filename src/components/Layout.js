import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from './dump/Header'
import LandingComponent from './dump/Landing'
import LoadingComponent from './dump/Loading';
import ContentComponent from './Content';

export default () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState({ open: false, text: '' });

  useEffect(() => {
    setUserData(getUserData());
  }, []);
  useEffect(() => {
    if (loading.open) {
      getUrlToken();
    }
  }, [loading])

  const hasData = !!userData;
  const button = hasData ? ({
    text: "LOG OUT",
    onClick: () => {
      logOutUser();
      setUserData(null)
    }
  }) : null;
  return (
    <>
      <HeaderComponent
        title={hasData ? `Welcome ${userData.name}` : "Welcome to Tweet Viewer"}
        button={button}
      />
      {
        hasData ?
          <ContentComponent {...userData} />
          :
          <>
            <LandingComponent onGetStarted={() => setLoading({ open: true, text: 'redirecting' })} />
            <LoadingComponent open={loading.open} text={loading.text} />
          </>
      }
    </>
  )
}

function getUserData() {
  let user = localStorage.getItem("user");
  try {
    user = user && JSON.parse(user);
    if (!user) {
      throw Error("No valido");
    }
    return user;
  } catch (exc) {
    return null;
  }
}

async function getUrlToken() {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/twitter-login`)
    localStorage.setItem("user-token", data.userToken);
    window.location = data.URLToken;
  } catch (error) {
    console.log({ error });
  }
}

function logOutUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('user-token');
}
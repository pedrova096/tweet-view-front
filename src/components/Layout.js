import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from './dump/Header'
import LandingComponent from './dump/Landing'
import LoadingComponent from './dump/Loading';
import ContentComponent from './Content';

function useFetchUser() {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const _userData = getUserData();
    if (!!_userData) {
      console.log({ _userData })
      getUserTweets();
    }
    setUserData(_userData);
  }, []);
  return { userData }

}

export default () => {
  const [loading, setLoading] = useState({ open: false, text: '' });
  const { userData } = useFetchUser();
  const hasData = !!userData;
  useEffect(() => {
    if (loading.open) {
      getUrlToken();
    }
  }, [loading])
  return (
    <>
      <HeaderComponent
        title={hasData ? `Welcome ${userData.name}` : "Welcome to Tweet Viewer"}
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

async function getUserTweets() {
  try {
    const userToken = localStorage.getItem("user-token");
    const { data } = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/user-tweets`,
      data: { userToken }
    });
    console.log({
      data
    })
  } catch (error) {
    console.log({ error })
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
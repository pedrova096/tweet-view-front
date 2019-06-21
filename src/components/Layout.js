import React, { useState } from 'react';
import axios from 'axios';
import HeaderComponent from './dump/Header'
import LandingComponent from './dump/Landing'
import LoadingComponent from './dump/Loading';
export default () => {
  const [getStart, setGetStart] = useState(false)
  return (
    <>
      <HeaderComponent
        title="Bienvenido a Tweet Viewer"
      />
      <LandingComponent onGetStarted={() => setGetStart(true)} />
      <LoadingComponent open={getStart} text={"Redirigiendo"} onDidMount={getUrlToken} />
    </>
  )
}

const getUrlToken = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/twitter-login`)
    localStorage.setItem("user-token", data.userToken);
    window.location = data.URLToken;
  } catch (error) {
    console.log(error);
  }

}
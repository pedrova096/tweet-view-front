import React, { useEffect } from 'react';
import LoadingComponent from './dump/Loading';
import axios from 'axios';
import * as qs from 'querystring';
import { LANDING } from '../routes'

export default (props) => {

  useEffect(() => {
    getTwitterUser(props.location.search).then(() => props.history.push(LANDING))
  }, [])

  return (<LoadingComponent open text="get in user" />)
}

async function getTwitterUser(urlParams) {
  try {
    const params = getSearchParams(urlParams);
    const userToken = localStorage.getItem('user-token');
    const paramsReq = { ...params, userToken };
    const { data } = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/twitter-user`,
      data: paramsReq,
    });
    if (data.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Redirigiendo');
    } else {
      console.log(data.err);
      throw new Error('Usuario no valido');
    }
  } catch (err) {
    console.log(err);
  }

}
function getSearchParams(search) {
  return search[0] === "?" ? qs.parse(search.slice(1)) : qs.parse(search);
}
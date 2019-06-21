import React, { Component } from 'react'
import Axios from 'axios';
import { Route, withRouter } from 'react-router-dom';
import * as qs from 'querystring';
export class TweetLogin extends Component {
  state = {
    err: null
  }
  async componentDidMount() {
    try {

      let search = this.props.location.search;
      const userToken = localStorage.getItem('user-token');
      const params = { ...this.getSearchParams(search), userToken };
      // console.log(params);
      let { data } = await Axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/twitter-user`,
        data: params
      });
      if (data.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        this.props.history.push('/');
        console.log('Redirigiendo');
      } else {
        console.log(data.err);
        throw new Error('Usuario no valido');
      }
    } catch (err) {
      this.setState({ err });
      console.log(err);
    }
  }
  render() {
    return (<></>);
  }
  getLoadingProps() {
    return {
      loading: true,
      loadingMessage: "CARGANDO USUARIO"
    }
  }
  getSearchParams(search) {
    return search[0] === "?" ? qs.parse(search.slice(1)) : qs.parse(search);
  }

}
export default (TweetLogin);
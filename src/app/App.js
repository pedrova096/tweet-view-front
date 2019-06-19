import React, { Component } from "react";
import Axios from "axios";
import "./App.css";
import Loading from "../components/loading";
import { withRouter } from "react-router-dom";
import Tweets from '../components/tweets'

class App extends Component {
  state = { tweets: [] };
  constructor() {
    super();
    this.doLogin = this.doLogin.bind(this);
    // this.getLoadingProps = this.getLoadingProps.bind(this);
  }
  async componentDidMount() {
    let userToken = localStorage.getItem("user-token");
    let user = localStorage.getItem("user");
    try {
      user = user && JSON.parse(user);
      if (!user) {
        throw Error("No valido");
      }
    } catch (exc) {
      user = null;
    }
    if (user) {
      this.setState({
        logged: true,
        user
      });
      Axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/user-tweets`,
        data: { userToken }
      }).then(res => {
        let { data } = res;
        if (data.ok) {
          this.setState({ tweets: data.data });
        }
      }).catch(err => console.log('err', { err }));
    }
  }
  render() {
    return (
      <div className="app">
        <header className="header">
          {this.getWelcomeHeader()}
        </header>
        <div className='main-container'>
          {this.getMainContain()}
        </div>
        <Loading {...this.getLoadingProps()} />
      </div>
    );
  }
  getWelcomeHeader() {
    let headerData = { titulo: "", actionName: "" };
    if (this.state.logged) {
      headerData.titulo = `BIENVENIDO ${this.state.user.name.toUpperCase()}`;
      headerData.actionName = `LOG OUT`;
    } else {
      headerData.titulo = `BIENVENIDO A TWEET-VIEWER`;
      headerData.actionName = `LOG IN`;
    }
    return (
      <div className="header__container">
        <span className="header__title">{headerData.titulo}</span>
        <h1 className="header__icon">
          <a className="--color-twitter" href="#">
            <i className="fab fa-twitter" />.
                    </a>
        </h1>
        <button className="header__button-log" onClick={this.doLogin}>
          {headerData.actionName}
        </button>
      </div>
    );
  }
  getMainContain() {
    if (this.state.logged) {
      return (
        <div className="main-container--loged">
          <section className="user-data">
            <div className="user-data__profile">
              <img
                className="user-data__img"
                src={this.state.user.profile_image_url}
                alt="NO USER IMAGE"
              />
            </div>
            <div className="user-data__title">
              <h1 className="user-data__full-name">
                <a href="#">{this.state.user.name}</a>
              </h1>
              <h4 className="user-data__user-name">
                <a href="#">{this.state.user.screen_name}</a>
              </h4>
            </div>
            <div className="user-data__bckg">
            </div>
          </section>
          <section className="user-tweets">
            {
              this.state.tweets.map(tw => {
                return (<Tweets {...tw} />)
              })
            }
          </section>
        </div>
      );
    }
    return (
      <div className="welcome-box">
        <img className="welcome-box__img"
          src="https://png.pngtree.com/element_our/md/20180301/md_5a9797d302f17.png"
          alt="Cirulo twitter"
        />
        <h1 className="welcome-box__title" >Welcome to TWEET-VIEWER</h1>
        <br />
        <footer className="welcome-box__footer">
          This application is associated with Twitter Inc &copy;
                    <br />
          Lorem ipsum dolor sit amet.
                </footer>
      </div>
    );
  }
  getLoadingProps() {
    return {
      loading: this.state.loading,
      loadingMessage: this.state.loadingMessage
    };
  }
  doLogin() {
    if (!this.state.logged) {
      this.setState({
        loading: true,
        loadingMessage: "REDIRIGIENDO"
      });
      this.getUrlToken();
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('user-token');
      this.setState({ logged: false });
    }
  }
  getUrlToken() {
    try {
      Axios(`${process.env.REACT_APP_API}/twitter-login`)
        .then(res => {
          localStorage.setItem("user-token", res.data.userToken);
          window.location = res.data.URLToken;
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
      // //
    } catch (error) {
      console.log(error);
    }

  }
}

export default withRouter(App);

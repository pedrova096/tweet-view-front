import './css/loading.css'
import React, { Component } from 'react'
const Loading = (props) => {
  return (
    <div className="background-container" style={props.loading ? {} : { display: "none" }}>
      <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
      <h1 className="load-message">{props.loadingMessage}</h1>
    </div>
  )
}
export default Loading;
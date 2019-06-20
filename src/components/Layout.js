import React from 'react';
import HeaderComponent from './dump/Header'
import LandingComponent from './dump/Landing'
export default () => {
  return (
    <>
      <HeaderComponent
        title="Bienvenido a Tweet Viewer"
      />
      <LandingComponent />
    </>
  )
}
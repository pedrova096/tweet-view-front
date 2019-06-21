import './styles.css'
import React from 'react'
import clsx from 'clsx'
import TwitterLogo from 'image/TwitterLogo'
import Container from 'react-bootstrap/Container';
const Loading = ({ open, text }) => {
  return (
    <div className={clsx({
      loading: open,
      hide: !open,
    })}>
      <div className="loading__point">
        <TwitterLogo className="loading__image" color="white" />
      </div>
    </div >

  )
}
export default Loading;
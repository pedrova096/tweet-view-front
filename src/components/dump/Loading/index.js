import './styles.css'
import React, { useEffect, useState, } from 'react'
import clsx from 'clsx'
import TwitterLogo from 'image/TwitterLogo'
const Loading = ({ open, text, onDidMount }) => {
  const [afterSecond, setAfter] = useState(false)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setAfter(true);
        onDidMount();
      }, 1000);
      return () => clearTimeout(timer);
    }
    return () => { };
  });
  return (
    <div className={clsx({
      loading: open,
      hide: !open,
    })}
    >
      <div className="loading__point">
        <TwitterLogo classSvg="loading__image" classPath="loading__path" color="none" />
      </div>
      <h2 className={clsx("loading__text",
        { "loading__text-animation": afterSecond })
      }>
        {text}
      </h2>
    </div >

  )
}

Loading.defaultProps = {
  open: false,
  text: "",
  onDidMount: () => { }
}
export default Loading;
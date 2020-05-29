import React from 'react'
export default ({ user, text, entities }) => {
  return (
    <div className="tweet-container">
      <div className="user-data__profile">
        <img className="user-data__img" src={user.profile_image_url} alt="NO USER IMAGE" />
      </div>
      <div className="tweet-content">
        <div className="tweet-header-data">
          <span className="user-data__full-name">
            {user.name}
          </span>
          <span className="user-data__user-name">
            {user.screen_name}
          </span>
        </div>
        <p className="tweet-text">
          {text}
        </p>
      </div>
    </div>
  )
}
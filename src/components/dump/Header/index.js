import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const Header = ({ title, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" className="header">
      <Navbar.Brand href="#home" className="header__title">
        <div className="header__icon-container">
          {/* <FontAwesomeIcon icon={faTwitter} className="header__icon-svg" /> */}
        </div>
        {title}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {!!onLogout && <Button type="submit" onClick={onLogout}>LOG OUT</Button>}
      </Navbar.Collapse>
    </Navbar>

  )
}
export default Header;
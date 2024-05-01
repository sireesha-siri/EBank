import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo-image"
        />
      </Link>

      <button type="button" className="logout-button" onClick={logoutButton}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)

import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showSubmitError: false, errorMsg: ''}

  changeUserId = event => {
    this.setState({userId: event.target.value})
  }

  changePin = event => {
    this.setState({pin: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.successfulSubmit(data.jwt_token)
    } else {
      this.failureSubmit(data.error_msg)
    }
  }

  successfulSubmit = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  failureSubmit = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
    console.log(errorMsg)
  }

  render() {
    const {userId, pin, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <div className="main-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>

          <form className="form-container" onSubmit={this.submitForm}>
            <h1>Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="user-id">User Id</label>
              <input
                type="text"
                id="user-id"
                placeholder="Enter User ID"
                onChange={this.changeUserId}
                value={userId}
              />
            </div>

            <div className="input-container">
              <label htmlFor="pin">PIN</label>
              <input
                type="password"
                id="pin"
                placeholder="Enter PIN"
                onChange={this.changePin}
                value={pin}
              />
            </div>

            <div className="button-container">
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

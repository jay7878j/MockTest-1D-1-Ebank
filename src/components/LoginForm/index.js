import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/ebank-login-img.png'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLoginFailed: false,
    errorMsg: '',
  }

  //   On Successful Login
  onSuccessfulLogin = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 2})
    history.replace('/')
  }

  //   On Login Failure
  onFailureLogin = errorMsg => {
    this.setState({
      isLoginFailed: true,
      errorMsg,
    })
  }

  //   On Form Submit
  onFromSubmit = async event => {
    const {username, password} = this.state

    event.preventDefault()
    const loginApi = 'https://apis.ccbp.in/ebank/login'
    const loginDetails = {
      user_id: username,
      pin: password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(loginApi, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
    // this.setState({
    //   username: '',
    //   password: '',
    //   showPassword: false,
    // })
  }

  //   Username Input Field
  usernameContainer = () => {
    const {username} = this.state
    // console.log(username)

    const onUsernameChange = event => {
      this.setState({username: event.target.value})
    }

    return (
      <div className="input-container">
        <label htmlFor="username" className="label">
          User ID
        </label>
        <input
          type="text"
          className="input-box"
          placeholder="Enter User Id"
          value={username}
          id="username"
          onChange={onUsernameChange}
          required
        />
      </div>
    )
  }

  //   Password Input Field
  passwordContainer = () => {
    const {password} = this.state

    const onPasswordChange = event => {
      this.setState({password: event.target.value})
    }

    return (
      <div className="input-container">
        <label htmlFor="password" className="label">
          PIN
        </label>
        <input
          type="password"
          className="input-box"
          placeholder="Enter PIN"
          value={password}
          id="password"
          onChange={onPasswordChange}
          required
        />
      </div>
    )
  }

  //   Login Route Rendering
  render() {
    const {isLoginFailed, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-app-container">
        <img className="website-logo" src={websiteLogo} alt="website login" />
        <div className="login-card">
          <h1>Welcome Back!</h1>
          <form className="form-container" onSubmit={this.onFromSubmit}>
            {this.usernameContainer()}
            {this.passwordContainer()}
            <div className="login-btn-container">
              <button type="submit" className="login-btn">
                Login
              </button>
              {isLoginFailed && <p className="error">{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

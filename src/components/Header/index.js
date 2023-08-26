import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const websiteLogo =
    'https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png'

  const onLogoutClick = () => {
    const {history} = props
    history.replace('/ebank/login')
    Cookies.remove('jwt_token')
  }

  return (
    <nav>
      <Link to="/">
        <img src={websiteLogo} alt="website logo" />
      </Link>
      <button type="button" onClick={onLogoutClick}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)

import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Products</Link></li>
          <li><Link to="users">Users</Link></li>
          <li><Link to="cart">Cart</Link></li>
        </ul>
      </nav>
      
      
    </div>
  )
}

export default Header

import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <Link to="/">Products</Link>
      <Link to="cart">Cart</Link>
    </div>
  )
}

export default Header

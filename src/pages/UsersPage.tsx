import { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { fetchAllUsersAsync } from "../redux/reducers/usersReducer"

const UsersPage = () => {
  const users = useAppSelector(state => state.usersReducer.users)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchAllUsersAsync())
  }, [])

  return (
    <div>
      {users && users.map(u => (
        <div>{u.role} {u.name} {u.email}</div>
      ))}
    </div>
  )
}

export default UsersPage

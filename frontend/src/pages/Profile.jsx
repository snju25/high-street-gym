import { useSelector } from "react-redux"

const Profile = () => {
  const user = useSelector(state => state.userState.user)
  console.log(user)
  return (
    <div>Profile</div>
  )
}
export default Profile
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/user/userSlice';

const Header = () => {
    const user = useSelector(state => state.userState.user)
    const dispatch = useDispatch()

  return (
    <header className=' bg-[#021431] py-2 text-neutral-content '>
    <div className='align-element flex justify-center sm:justify-end '>
      {user ? <div className='flex gap-x-2 sm:gap-x-8 items-center'>
        <p className='text-xs sm:text-sm'>Hello, {user.firstName} {user.lastName}</p>
        <button className='btn btn-xs self-center' onClick={()=> dispatch(logoutUser())}>Logout</button>
      </div> : 
         <div className='flex gap-x-6 justify-center items-center'>
         <Link to='/login' className='link link-hover text-xs sm:text-sm'>
           Sign in / Guest
         </Link>
         <Link to='/register' className='link link-hover text-xs sm:text-sm'>
           Create an Account
         </Link>
       </div>
      }
    </div>
  </header>
  )
}
export default Header
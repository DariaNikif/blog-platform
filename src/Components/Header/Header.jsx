import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, selectIsAuthenticated, selectUser } from '../../Redux/slice/authSlice';
import myPhoto from '../../Assets/profile.jpg';
import './Header.scss';

export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <header className='header'>
      <h2>
        <Link to='/'>RealWorld Blog</Link>
      </h2>
      {isAuthenticated ? (
        <>
          <Link to='/new-article'>
            <button className='btn-create'>Сreate article</button>
          </Link>
          <Link to='/profile'>
            <div className='name'>
              <span>{user.username}</span>
              <span className='img-user'>
                <img src={user.image || myPhoto} alt='photo' className='img-header' />
              </span>
            </div>
          </Link>
          <button className='btn-out' onClick={handleLogout}>
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to='/sign-in'>
            <button className='btn-in'>Sign In</button>
          </Link>
          <Link to='/sign-up'>
            <button className='btn-up'>Sign Up</button>
          </Link>
        </>
      )}
    </header>
  );
}

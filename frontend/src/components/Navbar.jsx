import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import userIcon from '/user.svg';

const Navbar = () => {
  const { user } = useContext(UserContext);
  console.log('Navbar ', user);
  return (
    <nav>
      <NavLink to='/' className='home'>
        Home
      </NavLink>
      {!user ? (
        <>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </>
      ) : (
        <NavLink to='/profile'>
          Hi, {user.name} <img className='userIcon' src={userIcon} alt='user' />
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;

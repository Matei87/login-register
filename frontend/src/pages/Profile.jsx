import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import UserIcon from '/user.svg';

const Profile = () => {
  const { user } = useContext(UserContext);

  console.log('PROFILE ', user);
  return (
    <div className='profile'>
      <h1>Profile Info</h1>
      <div className='wrapper'>
        <img src={UserIcon} alt='user' />

        <ul>
          {!!user && (
            <>
              <li>ID: {user['id']}</li>
              <li>Name: {user['name']}</li>
              <li>Email: {user['email']}</li>
              <li>Iat: {new Date(user['iat'] * 1000).toDateString()}</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;

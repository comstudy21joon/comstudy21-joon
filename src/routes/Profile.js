import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/'); // location.href
  };

  return (
    <>
      <h1>프로필</h1>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;

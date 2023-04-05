import { Logo, SignOut } from '../../../../assets/icons';
import Button from '../../../../components/Button/Button';
import { signOutAction } from '../../../../store/reducers/user';
import './Header.css';

const Header = ({ title = 'Dashboard Header here' }) => {
  return (
    <div className="header-container">
      <div className="header-left-side-container">
        <Logo className="header-logo" />
        <div className="header-title">{title}</div>
      </div>
      <div className="header-left-side-container">
        <Button className="sign-out-btn" onClick={signOutAction}>
          <SignOut />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;

import {
    faCircleInfo,
    faMusic,
    faPhone,
    faRightFromBracket,
    faShieldHalved,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN, REGISTER } from '~/Routes/routesConfig';
import { icons } from '../../utils/icons';
import { SearchMenu, UserMenu } from '../Popper';
import Search from '../Search';
import styles from './Header.module.scss';
const { AiOutlineCloudUpload } = icons;

const cx = classNames.bind(styles);
// TODO: Chưa gắn link thêm
const userMenuList = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Your profile',
        to: '/system/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faPhone} />,
        title: 'Contact us',
        to: '/system/contact',
    },
    {
        icon: <FontAwesomeIcon icon={faMusic} />,
        title: 'My Playlist',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleInfo} />,
        title: 'About us',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faShieldHalved} />,
        title: 'Privacy Policy',
        to: '',
    },
    {
        separateTop: true,
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Logout',
        to: '',
    },
];

function Header() {
    const navigate = useNavigate();
    // TODO: Sửa để demo, revert lại sau
    // const { isLoggedIn } = useSelector((state) => state.auth);
    const isLoggedIn = true;

    return (
        <div className={cx('wrapper')}>
            <SearchMenu>
                <Search />
            </SearchMenu>

            {/* User dropdown or Auth Buttons */}
            {isLoggedIn ? (
                <div className={cx('user', 'gap-4')}>
                    {/* Upload Btn */}
                    <span
                        className="cursor-pointer rounded-full bg-[color:#ffffff1a] p-1.5"
                        onClick={() => navigate('/system/upload')}
                    >
                        <AiOutlineCloudUpload size={30} />
                    </span>
                    {/* Avatar */}
                    <UserMenu menuList={userMenuList}>
                        <img
                            alt="User Avatar"
                            className={cx('user-avatar')}
                            src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                        />
                    </UserMenu>
                </div>
            ) : (
                <div className={cx('auth-btn-group')}>
                    <div className="flex gap-2">
                        <Link className={cx('auth-btn')} to={REGISTER}>
                            Join now
                        </Link>
                        <Link className={cx('auth-btn')} to={LOGIN}>
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;

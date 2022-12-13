import {
    faCircleInfo,
    faMusic,
    faPhone,
    faRightFromBracket,
    faShieldHalved,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN, REGISTER } from '~/Routes/routesConfig';
import { icons } from '../../utils/icons';
import { DefaultMenu as UserMenu } from '../Popper';
import Search from '../Search';
import styles from './Header.module.scss';
import { images } from '~/assets/images';

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
        onClick: function () {
            return 0;
        },
    },
];

function Header() {
    const navigate = useNavigate();
    // TODO: Sửa để demo, revert lại sau
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <div className={cx('wrapper')}>
            <Search />

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
                        <img alt="User Avatar" className={cx('user-avatar')} src={images.defaultAvatar} />
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

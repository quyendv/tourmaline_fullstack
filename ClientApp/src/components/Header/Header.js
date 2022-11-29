import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {icons} from '../../utils/icons'

import Search from '../Search';
const cx = classNames.bind(styles);
const {AiOutlineCloudUpload} = icons
function Header() {
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector((state) => state.auth);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <Search />
            </div>

            <div className={cx('user')}>
                {isLoggedIn ? (
                    <div className='flex items-center gap-4'>
                        <span title='upload' className='cursor-pointer' onClick={() => navigate('/system/upload')}><AiOutlineCloudUpload size={30}/></span>
                        <Link to={'/profile'} className='cursor-pointer'>
                            <img
                                alt="User Avatar"
                                className={cx('user-avatar')}
                                src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                            ></img>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className='flex gap-2'>
                            <Link to={'register'}>Đăng ký</Link>
                            <Link to={'login'}>Đăng nhập</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;

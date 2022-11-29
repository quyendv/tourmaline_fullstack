import classNames from 'classnames/bind';
import {useEffect, useState} from 'react';
import styles from './login.module.scss';
import {useDispatch, useSelector} from 'react-redux';
// import * as actions from '~/store/actions';
import * as actions from '../../store/actions'
import {Link, useNavigate} from 'react-router-dom';
import {routesConfigPublic} from '../../Routes/routesConfig'

const cx = classNames.bind(styles);

function Login() {
    const [payload, setPayload] = useState({username: '', password: ''});
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(payload)
        dispatch(actions.login(payload));
    };
    useEffect(() => {
        isLoggedIn && navigate(routesConfigPublic.homeRoute)
    }, [isLoggedIn])
    return (
        <div className={cx('login-page')}>
            <div className={cx('login-form')}>
                <h2 className={cx('title')}>Login</h2>
                <form>
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('login-input')}
                            value={payload.username}
                            onChange={(e) => setPayload((prev) => ({...prev, ['username']: e.target.value}))}
                        />
                        <label>Username</label>
                    </div>
                    {/* <InputForm text='Username'/> */}

                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('login-input')}
                            value={payload.password}
                            onChange={(e) => setPayload((prev) => ({...prev, ['password']: e.target.value}))}
                        />
                        <label>Password</label>
                    </div>
                    {/* <InputForm text='Password'/> */}
                    <button type="submit" className={cx('login-btn')} onClick={handleLogin}>
                        Login
                    </button>
                    <div className='mt-5 underline text-activecolor'>
                        <Link to='/register'>
                            Chưa có tài khoản? Đăng ký
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

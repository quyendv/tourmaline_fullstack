import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './login.module.scss';
import { useDispatch } from 'react-redux';
// import * as actions from '~/store/actions';
import * as actions from '../../store/actions'

const cx = classNames.bind(styles);
function Login() {
    const [payload, setPayload] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(payload)
        dispatch(actions.login(payload));
    };
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
                            onChange={(e) => setPayload((prev) => ({ ...prev, ['username']: e.target.value }))}
                        />
                        <label>Username</label>
                    </div>
                    {/* <InputForm text='Username'/> */}

                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('login-input')}
                            value={payload.password}
                            onChange={(e) => setPayload((prev) => ({ ...prev, ['password']: e.target.value }))}
                        />
                        <label>Password</label>
                    </div>
                    {/* <InputForm text='Password'/> */}
                    <button type="submit" className={cx('login-btn')} onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Login;

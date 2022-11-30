import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { apiRegister } from '../../services/auth';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const cx = classNames.bind(styles);

function Register() {
    const [payload, setPayload] = useState({username: '', name: '', email: '', password: '', gender: '0'});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault();
        const finalpayload = {username: payload.username, password: payload.password}
        dispatch(actions.register(finalpayload))
        navigate('/login')
    };
    
    return (
        <div className={cx('login-page')}>
            <div className={cx('login-form')}>
                <h2 className={cx('title')}>Register</h2>
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
                            type="text"
                            className={cx('login-input')}
                            value={payload.name}
                            onChange={(e) => setPayload((prev) => ({...prev, ['name']: e.target.value}))}
                        />
                        <label>Name</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('login-input')}
                            value={payload.password}
                            onChange={(e) => setPayload((prev) => ({...prev, ['password']: e.target.value}))}
                        />
                        <label>Password</label>
                    </div>
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('login-input')}
                            value={payload.email}
                            onChange={(e) => setPayload((prev) => ({...prev, ['email']: e.target.value}))}
                        />
                        <label>Email</label>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                            <input
                                type="radio"
                                value="1"
                                className={cx('radio')}
                                checked={payload.gender == '1'}
                                onChange={(e) => setPayload((prev) => ({...prev, ['gender']: e.target.value}))}
                            />
                            <label>Male</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <input
                                type="radio"
                                value="0"
                                className={cx('radio')}
                                checked={payload.gender == '0'}
                                onChange={(e) => setPayload((prev) => ({...prev, ['gender']: e.target.value}))}
                            />
                            <label>Female</label>
                        </div>
                    </div>
                    {/* <InputForm text='Password'/> */}
                    <button type="submit" className={cx('login-btn')} onClick={handleRegister}>
                        Register
                    </button>
                    <div className='mt-5 underline text-activecolor'>
                        <Link to={'/login'}>Đã có tài khoản? Đăng nhập</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;

import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register() {
    const [payload, setPayload] = useState({ username: '', name: '', email: '', password: '', gender: '0' });
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(payload);
    };
    return (
        <div className={cx('register-page')}>
            <div className={cx('register-form')}>
                <h2 className={cx('title')}>Register</h2>
                <form>
                    {/* username */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('register-input')}
                            value={payload.username}
                            onChange={(e) => setPayload((prev) => ({ ...prev, username: e.target.value }))}
                        />
                        <label>Username</label>
                    </div>
                    {/* name */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('register-input')}
                            value={payload.name}
                            onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value }))}
                        />
                        <label>Name</label>
                    </div>
                    {/* password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('register-input')}
                            value={payload.password}
                            onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
                        />
                        <label>Password</label>
                    </div>
                    {/* confirm password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('register-input')}
                            value={payload.password}
                            onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
                        />
                        <label>Confirm Password</label>
                    </div>
                    {/* email */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('register-input')}
                            value={payload.email}
                            onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
                        />
                        <label>Email</label>
                    </div>
                    {/* Gender */}
                    <div className="mt-9 flex gap-5">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="1"
                                className={cx('radio')}
                                id="radio-male"
                                checked={payload.gender === '1'}
                                onChange={(e) => setPayload((prev) => ({ ...prev, gender: e.target.value }))}
                            />
                            <label className="cursor-pointer" htmlFor="radio-male">
                                Male
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="0"
                                className={cx('radio')}
                                id="radio-female"
                                checked={payload.gender === '0'}
                                onChange={(e) => setPayload((prev) => ({ ...prev, gender: e.target.value }))}
                            />
                            <label className="cursor-pointer" htmlFor="radio-female">
                                Female
                            </label>
                        </div>
                    </div>
                    {/* Register btn */}
                    <button type="submit" className={cx('register-btn')} onClick={handleRegister}>
                        Register
                    </button>
                    {/* Login link */}
                    <div className="mt-6 py-2 tracking-wide text-white">
                        Already on Tourmaline?{' '}
                        <Link className={cx('login-link')} to="/login">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Link, useNavigate } from 'react-router-dom';
import { routesConfigPublic } from '../../Routes/routesConfig';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const cx = classNames.bind(styles);
const yupSchema = yup
    .object({
        username: yup.string().required(),
    })
    .required();

// TODO: làm nút goBack cho login, register, forgot password
function Login() {
    const [payload, setPayload] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupSchema),
    });

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(payload)
        dispatch(actions.login(payload));
    };

    useEffect(() => {
        isLoggedIn && navigate(routesConfigPublic.homeRoute);
    }, [isLoggedIn]);

    return (
        <div className={cx('login-page')}>
            <div className={cx('login-form')}>
                <h2 className={cx('title')}>Login</h2>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    {/* Username */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('login-input')}
                            value={payload.username}
                            onChange={(e) => setPayload((prev) => ({ ...prev, username: e.target.value }))}
                            {...register('username')}
                        />
                        <label>Username</label>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>
                    {/* Password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('login-input')}
                            value={payload.password}
                            onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
                        />
                        <label>Password</label>
                    </div>
                    {/* Submit btn */}
                    <button type="submit" className={cx('login-btn')} onClick={handleLogin}>
                        Login
                    </button>
                    {/* Link register */}
                    <div className="mt-6 py-2 tracking-wide text-white">
                        Don't have an account?{' '}
                        <Link className={cx('register-link')} to="/register">
                            Register now
                        </Link>
                    </div>
                    {/* Forgot password */}
                    <div className="tracking-wide">
                        <Link to="/forgot-password" className={cx('forgot-password-link', '-ml-2')}>
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { routesConfigPublic } from '../../Routes/routesConfig';
import * as actions from '../../store/actions';
import styles from './login.module.scss';

const cx = classNames.bind(styles);
const yupSchema = yup
    .object({
        username: yup.string().required('Username is required!'),
        password: yup
            .string()
            .required('Password is required!')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                'Must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character',
            ),
    })
    .required();

// TODO: làm nút goBack cho login, register, forgot password
function Login() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Validate resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupSchema),
    });

    const handleLogin = (data) => {
        // e.preventDefault(); // if have errors auto preventDefault
        // K cần check object empty (errors), handleSubmit chỉ khi hết lỗi mới thực hiện hàm
        console.log(data);
        dispatch(actions.login(data)); // or getValueRoot
    };

    useEffect(() => {
        isLoggedIn && navigate(routesConfigPublic.homeRoute);
    }, [isLoggedIn]);

    return (
        <div className={cx('login-page')}>
            <div className={cx('login-form')}>
                <h2 className={cx('title')}>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    {/* Username */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            placeholder="&nbsp;"
                            className={cx('login-input')}
                            {...register('username')}
                        />
                        <label>Username</label>
                        {errors.username && <p className={cx('form-msg')}>{errors.username.message}</p>}
                    </div>
                    {/* Password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            placeholder="&nbsp;"
                            className={cx('login-input')}
                            {...register('password')}
                        />
                        <label>Password</label>
                        {errors.password && <p className={cx('form-msg')}>{errors.password.message}</p>}
                    </div>
                    {/* Submit btn */}
                    <button type="submit" className={cx('login-btn')}>
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

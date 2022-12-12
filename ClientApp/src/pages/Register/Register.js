import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import * as actions from '../../store/actions';
import styles from './Register.module.scss';

// TODO: setError user already registered
const cx = classNames.bind(styles);
const yupSchema = yup
    .object({
        username: yup.string().required('Username is required'),
        name: yup.string().required('Name is required'),
        password: yup
            .string()
            .required('Password is required')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                'Must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character',
            ),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        email: yup
            .string()
            .required('Email is required')
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'),
        gender: yup.mixed().required('Gender is required'),
    })
    .required();

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isRegisterSuccess, msg } = useSelector((state) => state.auth);

    // Validate resolver
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupSchema),
    });

    const handleRegister = (data) => {
        // e.preventDefault();
        // console.log(data); // contains confirm password
        dispatch(actions.logout());
        const payload = { ...data };
        delete payload.confirmPassword;
        dispatch(actions.register(payload));
    };

    useEffect(() => {
        if (msg) {
            setError('username', { type: 'custom', message: msg }, { shouldFocus: true });
        } else {
            clearErrors('password');
            if (isRegisterSuccess) navigate('/login');
        }
    }, [isRegisterSuccess, msg]);

    return (
        <div className={cx('register-page')}>
            <div className={cx('register-form')}>
                <h2 className={cx('title')}>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    {/* username */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('register-input')}
                            placeholder="&nbsp;"
                            {...register('username')}
                        />
                        <label>Username</label>
                        {errors.username && <p className={cx('form-msg')}>{errors.username.message}</p>}
                    </div>
                    {/* name */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('register-input')}
                            placeholder="&nbsp;"
                            {...register('name')}
                        />
                        <label>Name</label>
                        {errors.name && <p className={cx('form-msg')}>{errors.name.message}</p>}
                    </div>
                    {/* password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('register-input')}
                            placeholder="&nbsp;"
                            {...register('password')}
                        />
                        <label>Password</label>
                        {errors.password && <p className={cx('form-msg')}>{errors.password.message}</p>}
                    </div>
                    {/* confirm password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            className={cx('register-input')}
                            placeholder="&nbsp;"
                            {...register('confirmPassword')}
                        />
                        <label>Confirm Password</label>
                        {errors.confirmPassword && <p className={cx('form-msg')}>{errors.confirmPassword.message}</p>}
                    </div>
                    {/* email */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            className={cx('register-input')}
                            placeholder="&nbsp;"
                            {...register('email')}
                        />
                        <label>Email</label>
                        {errors.email && <p className={cx('form-msg')}>{errors.email.message}</p>}
                    </div>
                    {/* Gender */}
                    <div className="mt-9 flex flex-col">
                        <div className="flex gap-5">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="1"
                                    className={cx('radio')}
                                    id="radio-male"
                                    {...register('gender')}
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
                                    {...register('gender')}
                                />
                                <label className="cursor-pointer" htmlFor="radio-female">
                                    Female
                                </label>
                            </div>
                        </div>
                        {errors.gender && <p className={cx('form-msg')}>{errors.gender.message}</p>}
                    </div>
                    {/* Register btn */}
                    <button type="submit" className={cx('register-btn')}>
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

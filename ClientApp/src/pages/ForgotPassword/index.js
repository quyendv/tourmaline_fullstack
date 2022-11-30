import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.scss';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const handleReset = (e) => {
        e.preventDefault();
    };

    return (
        <div className={cx('forgot-password')}>
            <form className={cx('fp__form')}>
                <h2 className={cx('fp__title')}>Forgot Password?</h2>
                <p className={cx('fp__subtitle')}>Reset password by email</p>
                <div className={cx('form-group')}>
                    <input type="email" className={cx('form-control')} placeholder="&nbsp;" />
                    <label className={cx('form-label')}>Email</label>
                </div>
                <div className={cx('fp__btn-group')}>
                    <button className={cx('fp__submit-btn')} type="submit" onClick={handleReset}>
                        Reset Password
                    </button>
                    <Link className={cx('fp__back-btn')} to="/login">
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;

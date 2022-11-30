import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const newUserInfo = useRef({});

    useEffect(() => {
        getUserInfo();
    }, []);

    const updateUserInfo = async (e) => {
        e.preventDefault();
        // TODO: update user info in database through API
        // setUserInfo by newUserInfo.current
        console.log(userInfo);
    };

    const getUserInfo = async () => {
        // Fetch API to get account information: username, email, password (?), phone number, address. (JSON)
        // Hardcode for now
        const response = {
            username: 'username.demo', // read only
            name: 'Full Name',
            bio: "I'm ... . Full Stack Designer I enjoy creating user-centric, delightful and human experiences.",
            birth: '2002-12-12', // yyyy-mm-dd
            gender: 1, // int 1:male, 2:female
            avatar: 'https://www.bootdey.com/img/Content/avatar/avatar7.png',
            email: 'admin@tourmaline.com',
            phone: '0987654321',
            address: '123, ABC Street, XYZ City, 12345',
            createTime: '09 Dec 2017',
            isAdmin: 1,
        };
        setUserInfo(response);
        newUserInfo.current = response;
    };

    // TODO: update useRef()
    const handleChangeInput = (e) => {
        if (e.target.matches('input[type="radio"]')) {
            newUserInfo.current.gender = e.target.value;
        } else {
            newUserInfo.current[e.target.name] = e.target.value;
        }
        console.log(newUserInfo.current);
    };

    const getMaxToday = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        // today = mm + '/' + dd + '/' + yyyy;
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    };

    return (
        <form method="" action="" className={cx('profile')}>
            {/* Avatar + About */}
            <div className={cx('profile-item1')}>
                <div className={cx('profile__avatar', 'mb-4')}>
                    <img src={userInfo.avatar} alt="" className="mx-auto h-[90px] w-[90px] rounded-full object-cover" />
                </div>

                <div className={cx('profile__name', 'flex flex-col items-center justify-center')}>
                    <h3 className="mb-2 text-xl font-semibold">{userInfo.name}</h3>
                    <h5 className="text-sm text-slate-400">{userInfo.username}</h5>
                </div>

                <div className={cx('profile__change-avatar', 'relative mx-auto mt-3 max-w-[200px] text-lg text-white')}>
                    <div
                        className={cx(
                            'profile__change-avatar-btn',
                            'mx-auto flex items-center justify-center gap-2 rounded-lg bg-blue-400 p-2',
                        )}
                    >
                        <FontAwesomeIcon icon={faCameraRetro} />
                        <span>Change Photos</span>
                    </div>
                    <input type="file" className="absolute inset-0 cursor-pointer opacity-0" />
                </div>

                {/* {userInfo.createTime && (
                    <div className={cx('profile__joined-date', 'my-2 text-right text-sm')}>
                        Joined {userInfo.createTime}
                    </div>
                )}

                {userInfo.isAdmin && (
                    <div className={cx('profile__user-role', 'text-right')}>
                        <span className="rounded-md bg-gray-400 p-2 text-right font-semibold text-white">
                            administrator
                        </span>
                    </div>
                )} */}

                <div className={cx('profile__bio', 'mt-8 text-center')}>
                    <h2 className="mb-4 text-2xl font-bold text-[color:var(--active-color)]">About</h2>
                    <p>{userInfo.bio}</p>
                </div>
            </div>
            {/* Info Update */}
            <div className={cx('profile-item2')}>
                <h2 className="mb-2 text-xl font-semibold text-[color:var(--active-color)]">User Details</h2>
                {/*username bio */}
                <div className={cx('profile__details', 'grid grid-cols-2 gap-x-10')}>
                    {/* FullName */}
                    <div className="col-span-2 md:col-span-1">
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Full Name</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                name="name"
                                defaultValue={userInfo.name}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="col-span-2 md:col-span-1">
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Email</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                name="email"
                                defaultValue={userInfo.email}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="col-span-2 md:col-span-1">
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Phone</label>
                            <input
                                type="tel"
                                className={cx('form-control')}
                                name="phone"
                                defaultValue={userInfo.phone}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    {/* Birth */}
                    <div className="col-span-2 md:col-span-1">
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Birth</label>
                            <input
                                type="date"
                                className={cx('form-control')}
                                name="birth"
                                max={getMaxToday()}
                                defaultValue={userInfo.birth}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    {/* Address */}
                    <div className="col-span-2 md:col-span-1">
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Address</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                name="address"
                                defaultValue={userInfo.address}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    {/* Gender */}
                    <div className="col-span-2 md:col-span-1">
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Gender</label>
                            <div className="flex items-center px-3 py-[7px]">
                                <input
                                    type="radio"
                                    className={cx('form-control')}
                                    id="male"
                                    name="gender"
                                    value={1}
                                    defaultChecked={userInfo.gender}
                                    onChange={handleChangeInput}
                                />
                                <label htmlFor="male">Male</label>
                                <input
                                    type="radio"
                                    className={cx('form-control')}
                                    id="female"
                                    name="gender"
                                    value={0}
                                    defaultChecked={!userInfo.gender}
                                    onChange={handleChangeInput}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    {/* Bio */}
                    <div className="col-span-2">
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Bio</label>
                            <textarea
                                className={cx('form-control')}
                                name="bio"
                                rows="4"
                                defaultChecked={userInfo.bio}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                </div>
                {/* Button submit/cancel */}
                <div className="flex items-center justify-end">
                    <button
                        className={cx(
                            'profile__cancel-btn',
                            'rounded-md bg-gray-300 py-1.5 px-3 text-xl font-semibold',
                        )}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className={cx(
                            'profile__save-btn',
                            'ml-4 rounded-md bg-red-500 py-1.5 px-3 text-xl font-semibold',
                        )}
                        type="submit"
                        onClick={updateUserInfo}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Profile;

import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.scss';
import moment from 'moment';

import { getProfile, setProfile } from '../../services/user';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/constant';
import { images } from '~/assets/images';

const cx = classNames.bind(styles);

function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const [avatarLink, setAvatarLink] = useState('');
    const [displayUserInfo, setDisplayUserInfo] = useState({});
    const newUserInfo = useRef({});
    const { token } = useSelector((state) => state.auth);
    const { username } = useSelector((state) => state.user);
    const avatarFile = useRef();

    useEffect(() => {
        const getUserInfo = async () => {
            // Fetch API to get account information: username, email, password (?), phone number, address. (JSON)
            // Hardcode for now
            // const info = {
            //     username: 'username.demo', // read only
            //     name: 'Full Name',
            //     bio: "I'm ... . Full Stack Designer I enjoy creating user-centric, delightful and human experiences.",
            //     birth: '2002-12-12', // yyyy-mm-dd
            //     gender: true, // int 1:male, 2:female
            //     // avatar: 'https://www.bootdey.com/img/Content/avatar/avatar7.png',
            //     email: 'admin@tourmaline.com',
            //     // phone: '0987654321',
            //     // address: '123, ABC Street, XYZ City, 12345',
            //     createTime: '09 Dec 2017',
            //     isAdmin: false,
            // };
            const response = await getProfile(username, token);
            const finalInfo = {
                ...response.data,
                createTime: response.data.createTime.split('T')[0],
                birth: response.data.birth.split('T')[0],
            };

            setUserInfo(finalInfo);
            setDisplayUserInfo({
                name: newUserInfo.current.name,
                bio: newUserInfo.current.bio,
            });

            newUserInfo.current = finalInfo;
        };

        getUserInfo();

        // const fetchAvatar = async () => {
        //     setAvatarLink(`${BASE_URL}/api/user/getAvatar/${username}`);
        // };
        // fetchAvatar();
        setAvatarLink(images.defaultAvatar); // tải ảnh default về cho dễ dùng những chỗ khác nữa, k cần fetAPI đâu
    }, []);

    const handleChangeAvatarFileInput = (e) => {
        avatarFile.current = e.target.files[0];
        const avatarLocalLink = URL.createObjectURL(avatarFile.current);

        setAvatarLink(avatarLocalLink);

        return () => URL.revokeObjectUrl(avatarLocalLink);
    };

    const updateUserInfo = async (e) => {
        e.preventDefault();
        // TODO: update user info in database through API
        // setUserInfo by newUserInfo.current
        const finalPayload = {
            ...userInfo,
            username: username,
            avatar: avatarFile.current,
        };

        const response = await setProfile(finalPayload, token);

        // console.log(userInfo);
        // Update bio text when profile is successfully updated
        setDisplayUserInfo({
            name: newUserInfo.current.name,
            bio: newUserInfo.current.bio,
        });

        // Show toast
        toast.success(`Profile updated successfully!`, {
            position: 'top-right',
            autoClose: 1600,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    // TODO: update useRef()
    const handleChangeInput = (e) => {
        if (e.target.matches('input[type="radio"]')) {
            newUserInfo.current.gender = e.target.value != 0;
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
        <form
            method=""
            action=""
            className={cx('profile', 'container mx-auto grid min-h-[65%] w-full grid-cols-12 gap-4 p-4')}
        >
            {/* Avatar + About */}
            <div className={cx('profile-item1')}>
                <div className={cx('profile__avatar', 'mb-4')}>
                    <img src={avatarLink} alt="" className="mx-auto h-[90px] w-[90px] rounded-full object-cover" />
                </div>

                <div className={cx('profile__name', 'flex flex-col items-center justify-center')}>
                    <h3 className="mb-2 text-xl font-semibold">{displayUserInfo.name}</h3>
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
                    <input
                        type="file"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        accept="image/*"
                        onChange={handleChangeAvatarFileInput}
                    />
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
                    <p>{displayUserInfo.bio}</p>
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
                                defaultValue={userInfo.bio}
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

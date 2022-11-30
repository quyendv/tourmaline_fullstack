import {
    faFacebookSquare,
    faGithubSquare,
    faGooglePlusSquare,
    faInstagramSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {faEarthAfrica, faLocationDot, faPaperPlane, faPhone} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import {toast} from 'react-toastify';
import styles from './Contact.module.scss';

import emailjs from 'emailjs-com';

const cx = classNames.bind(styles);

function Contact() {
    async function sendEmail(e) {
        e.preventDefault();

        const toastOptions = {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        };

        const toastId = toast.loading('Please wait...');
        emailjs.sendForm('service_ri6yvj6', 'template_indvrjj', e.target, 'eZafXlsFn3sqDHeHI').then(
            (result) => {
                toast.update(toastId, {
                    render: 'Send message successfully!',
                    type: 'success',
                    isLoading: false,
                    ...toastOptions,
                    onClose: () => {
                        window.location.reload();
                    },
                });
            },
            (error) => {      
                toast.update(toastId, {
                    render: 'Send message failed!',
                    type: 'error',
                    isLoading: false,
                    ...toastOptions,
                });
                console.log(error.text);
            },
        );
    }

    return (
        <div
            className="mx-auto grid max-w-[500px] grid-cols-1 justify-center shadow-2xl md:container md:grid-cols-2 lg:max-h-[610px] lg:max-w-[920px]">
            {/* Send message */}
            <div className="bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-10 lg:p-12">
                <h1 className="mb-6 text-3xl text-white">Send us a message</h1>
                <form action="" onSubmit={sendEmail}>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            type="text"
                            id="contact__name"
                            name="contact__name"
                            placeholder="&nbsp;"
                            required
                        />
                        <label htmlFor="contact__name" className={cx('form-label')}>
                            Name
                        </label>
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            type="email"
                            id="contact__email"
                            name="contact__email"
                            placeholder="&nbsp;"
                            required
                        />
                        <label htmlFor="contact__email" className={cx('form-label')}>
                            Email
                        </label>
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            type="text"
                            id="contact__subject"
                            name="contact__subject"
                            placeholder="&nbsp;"
                            required
                        />
                        <label htmlFor="contact__subject" className={cx('form-label')}>
                            Subject
                        </label>
                    </div>
                    <div className={cx('form-group')}>
                        <textarea
                            className={cx('form-control')}
                            id="contact__message"
                            name="contact__message"
                            placeholder="&nbsp;"
                            required
                            rows="5"
                            col="10"
                        />
                        <label htmlFor="contact__message" className={cx('form-label')}>
                            Message
                        </label>
                    </div>
                    <button type="submit" className="mt-4 rounded bg-pink-500 px-4 py-2 text-white">
                        Send Message
                    </button>
                </form>
            </div>

            {/* Contact Info */}
            <div className="p-10 lg:p-12">
                {/* General info */}
                <h1 className="mb-2 text-3xl font-semibold">Contact us</h1>
                <p className="mb-6 text-lg text-pink-500">We're open for any suggestion!</p>
                <div className={cx('contact-info__item', 'group hover:shadow-lg')}>
                    <span className={cx('contact-info__item__icon', 'group-hover:bg-green-400 group-hover:text-white')}>
                        <FontAwesomeIcon icon={faLocationDot}/>
                    </span>
                    <p>
                        <label className="inline-block w-fit font-semibold  lg:w-16">Address</label>: Cau Giay, Hanoi,
                        Vietnam
                    </p>
                </div>
                <div className={cx('contact-info__item', 'group hover:shadow-lg')}>
                    <span className={cx('contact-info__item__icon', 'group-hover:bg-green-400 group-hover:text-white')}>
                        <FontAwesomeIcon icon={faPhone}/>
                    </span>
                    <p>
                        <label className="inline-block w-fit font-semibold  lg:w-16">Phone</label>: +84 xxx xxx xxx
                    </p>
                </div>
                <div className={cx('contact-info__item', 'group hover:shadow-lg')}>
                    <span className={cx('contact-info__item__icon', 'group-hover:bg-green-400 group-hover:text-white')}>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </span>
                    <p>
                        <label className="inline-block w-fit font-semibold  lg:w-16">Email</label>:
                        moonlightsculptor.contact@gmail.com
                    </p>
                </div>
                <div className={cx('contact-info__item', 'group hover:shadow-lg')}>
                    <span className={cx('contact-info__item__icon', 'group-hover:bg-green-400 group-hover:text-white')}>
                        <FontAwesomeIcon icon={faEarthAfrica}/>
                    </span>
                    <p>
                        <label className="inline-block w-fit font-semibold  lg:w-16">Website</label>:
                        moonlightsculptor.com
                    </p>
                </div>

                
            </div>
        </div>
    );
}

export default Contact;

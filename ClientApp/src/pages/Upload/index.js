import classNames from 'classnames/bind';
import DropFile from '../../components/DropFile';
import styles from './Upload.module.scss';

const cx = classNames.bind(styles);

function Upload() {
    const handleFileChange = (files) => {
        console.log(files);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Upload music</h1>
                <DropFile
                    onFileChange={(files) => {
                        handleFileChange(files);
                    }}
                />
            </div>
        </div>
    );
}
export default Upload;

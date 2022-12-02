import { faCircleDown, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import uploadImages from '~/assets/images';
import styles from './DropFile.module.scss';

const cx = classNames.bind(styles);

function FileItem({ data, handleRemove }) {
    const downloadBtnRef = useRef();
    const hrefRef = useRef();

    const handleDownload = (data) => {
        if (data.audioFile && data.infos) {
            // console.log(data);

            // clear/create URL
            if (hrefRef.current) URL.revokeObjectURL(hrefRef.current);
            hrefRef.current = URL.createObjectURL(data.audioFile);

            // set property download button (href, download='file.ext') and then click()
            if (downloadBtnRef.current) {
                downloadBtnRef.current.href = hrefRef.current;

                downloadBtnRef.current.download = `${data.infos.songName}.${data.audioFile.type.split('/')[1]}`;
                // downloadBtnRef.current.download = `${data.infos.songName}.${data.audioFile.name.split('.')[1]}`;

                // console.log(downloadBtnRef.current.download);
                downloadBtnRef.current.click();
            }
        } else {
            throw new Error('Download error in FileItem!! Invalid data, passing file argument');
        }
    };

    // TODO: Xử lý trim() value tên bài hát để đặt tên file tải về, trim() url, ...
    // TODO: Xử lý download lần đầu: click icon gọi downloadBtn click -> down 2 lần -> wrap icon by <Link> || iconDownload click || call handleDownload
    // TODO: Xử lý chỉ nhận file audio

    // auto download when rendering: tắt StrictMode mới hoạt động đúng
    useEffect(() => {
        if (handleRemove) {
            // console.log('useEffect called!'); // test re-render
            handleDownload(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('drop-file-item')}>
            <img src={uploadImages[data.audioFile.type.split('/')[1]] || uploadImages.default} alt="" />
            <div className={cx('drop-file-item-info')}>
                <p>{data.audioFile.name}</p>
                <p>{data.audioFile.size}B</p>
            </div>

            {/* only use to download, auto hidden */}
            <Link to="" ref={downloadBtnRef} target="_blank" download="file.mp3" />

            {/* show closeBtn and downloadBtn if handleRemove callback is passed in | or set default handleRemove = () => {} */}
            {/* Tạm chỉ xử lý remove + download khỏi preview khi truyền hàm close -> fix sau */}
            {handleRemove && (
                <>
                    <span className={cx('down-drop-file-item')} onClick={() => handleDownload(data.audioFile)}>
                        <FontAwesomeIcon icon={faCircleDown} />
                    </span>
                    <span className={cx('del-drop-file-item')} onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                </>
            )}
        </div>
    );
}

export default memo(FileItem);

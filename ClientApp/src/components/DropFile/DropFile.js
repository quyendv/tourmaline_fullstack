import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import uploadImages from '../../assets/images';
import styles from './DropFile.module.scss';
import FileItem from './FileItem';

const cx = classNames.bind(styles);

function DropFile({ onFileChange }) {
    const [file, setFile] = useState(); // inputFile: audio, includes song's info when click addBtn
    const [fileList, setFileList] = useState([]); // List Audio File with each file contains song's info
    const [songName, setSongName] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [lyric, setLyric] = useState('');
    const [description, setDescription] = useState('');

    const dropAreaRef = useRef();
    const inputFileAudioRef = useRef();
    const songDetailsRef = useRef();

    // TODO: test re-render
    useEffect(() => {
        console.log('useEffect DropFile called!');
    });

    // --------- handle remove class (css) -------------
    const handleDragEnter = () => {
        dropAreaRef.current.classList.add(styles.dragover);
    };
    const handleDragLeave = () => {
        dropAreaRef.current.classList.remove(styles.dragover);
    };
    const handleDrop = () => {
        dropAreaRef.current.classList.remove(styles.dragover);
    };

    // ---------- handle logic with file -----------------------
    // onChange input file
    const handleDropFile = useCallback((e) => {
        // const newFile = e.target.files[0];
        const newFile = inputFileAudioRef.current.files[0];
        if (newFile) {
            setFile(newFile);
            // e.target.value = null; // not here, addToPreview first and then clear to re-choose prevFile again
        }
    }, []);

    // click addBtn: add FileItem with data
    const handleAddToPreview = useCallback(() => {
        // check song's info
        if (file && songName.trim() && coverUrl.trim() && lyric.trim() && description.trim()) {
            // add data to file then add file to fileList
            file.data = {
                songName,
                coverUrl,
                lyric,
                description,
            };
            setFileList([...fileList, file]);

            // clear song-details (clear inputs + clear state file (clear shortPreview when it's null))
            // + clear inputFile (can re-choose prevFile again)
            // + clear class 'invalid' in songDetailsRef.current
            setSongName('');
            setCoverUrl('');
            setLyric('');
            setDescription('');
            setFile(null);
            inputFileAudioRef.current.value = null;
            songDetailsRef.current.classList.remove(styles.invalid);
        } else {
            songDetailsRef.current.classList.add(styles.invalid);
            if (!file) {
                throw new Error(`Invalid Audio File, type is ' ${typeof file}`);
            }
        }
    }, [coverUrl, description, file, fileList, lyric, songName]);

    // onClick close FileItem: remove FileItem from Preview List
    const handleRemoveFileFromPreview = useCallback(
        (file) => {
            const newFileList = [...fileList];
            newFileList.splice(fileList.indexOf(file), 1); // or passing index instead of element
            setFileList(newFileList);
        },
        [fileList],
    );

    // onFileChange(fileList);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-area')}>
                <div className={cx('left-part')}>
                    <div
                        className={cx('drop-area')}
                        ref={dropAreaRef}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <img src={uploadImages.cloudUpload} alt="" />
                        <p>Drag & Drop or Choose your files here</p>
                        <input
                            type="file"
                            ref={inputFileAudioRef}
                            onChange={handleDropFile}
                            accept="audio/*" // only audio
                        />
                    </div>
                    {/* ShortPreview: check file.type, some file extensions are not recognized: sql, ... -> handle after */}
                    {file && file.type && <FileItem file={file} />}
                </div>

                <div className={cx('song-details')} ref={songDetailsRef}>
                    <h3>The song's information</h3>
                    <button className={cx('add')} onClick={handleAddToPreview}>
                        Add
                    </button>
                    <div className={cx('song-info')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="song-name">Song name</label>
                            <input
                                className={cx('form-control')}
                                id="song-name"
                                type="text"
                                placeholder="Enter the name of the uploaded song ..."
                                value={songName}
                                onChange={(e) => setSongName(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="cover-url">Cover URL</label>
                            <input
                                className={cx('form-control')}
                                id="cover-url"
                                type="url"
                                placeholder="https://example.png"
                                value={coverUrl}
                                onChange={(e) => setCoverUrl(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="lyric">Lyric</label>
                            <textarea
                                className={cx('form-control')}
                                value={lyric}
                                id="lyric"
                                // cols="30"
                                rows="2"
                                onChange={(e) => setLyric(e.target.value)}
                            ></textarea>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                className={cx('form-control')}
                                value={description}
                                id="description"
                                // cols="30"
                                rows="2"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <p className={cx('message')}>
                        Please choose your file and fill in all the song's information before adding!
                    </p>
                </div>
            </div>

            {fileList.length > 0 && (
                <div className={cx('preview')}>
                    <h3>Ready to upload</h3>
                    <div className={cx('preview-container')}>
                        <div className={cx('file-list')}>
                            {fileList.map((file, index) => (
                                <FileItem
                                    key={index}
                                    file={file}
                                    // handleRemove={() => handleRemoveFile(file)}
                                    handleRemove={handleRemoveFileFromPreview}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropFile;

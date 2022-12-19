import classNames from 'classnames/bind';
import { useCallback, useRef, useState } from 'react';
import uploadImages from '../../assets/images';
import styles from './DropFile.module.scss';
import FileItem from './FileItem';
import { useSelector } from 'react-redux';
import { uploadFile } from '../../services/music';
import { Loading } from '../Load';

const cx = classNames.bind(styles);

// TODO: response
function DropFile({ onFileChange }) {
    const [fileList, setFileList] = useState([]); // List Audio File (for preview) with each element is Obj { audioFile: , infos: }
    const [songName, setSongName] = useState('');
    const [description, setDescription] = useState('');
    const [audioFile, setAudioFile] = useState(); // only use to forceUpdate

    const coverImgRef = useRef(); // coverImg input file
    const audioFileRef = useRef(); // inputFile: audio
    const newData = useRef(); // newData is obj { audioFile: , infos: } (is child of fileList)
    const dropAreaRef = useRef(); // to css dragover
    const songDetailsRef = useRef(); // to css songInfos invalid
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    // --------- handle toggle class (css) -------------
    const addStyleDragOver = () => {
        dropAreaRef.current.classList.add(styles.dragover);
    };
    const removeStyleDragOver = () => {
        dropAreaRef.current.classList.remove(styles.dragover);
    };

    // ---------- handle logic with file -----------------------
    // onChange input file
    const handleDropAudioFile = useCallback((e) => {
        const newFile = e.target.files[0];
        // const newFile = audioFileRef.current.files[0];
        if (newFile) {
            audioFileRef.current.file = newFile;
            setAudioFile(newFile);
            // e.target.value = null; // not here, addToPreview first and then clear to re-choose prevFile again
        }
    }, []);
    // click addBtn: add FileItem with data
    const handleAddToPreview = useCallback(() => {
        // check song's info
        if (
            audioFileRef.current.file &&
            songName.trim() &&
            coverImgRef.current.file /* && lyric.trim() && description.trim() */
        ) {
            // ------ add data to file then add file to fileList
            const infos = {
                songName,
                description,
            };
            setFileList([...fileList, { audioFile: audioFileRef.current.file, infos }]);

            // ------ Save to newData & handleAPI:
            newData.current = { audioFile: audioFileRef.current.file, infos };
            // console.log(newData.current);
            // console.log(audioFileRef);
            // TODO: Sơn Kao post data chỗ này
            const finalPayload = {
                media: audioFileRef.current.file,
                cover: coverImgRef.current.file,
                name: infos.songName,
                description: infos.description,
            };
            handleUploadAPI(finalPayload, token);

            // ------ clear song-details
            handleClearData();
        } else {
            songDetailsRef.current.classList.add(styles.invalid);
            if (!audioFileRef.current.value) {
                throw new Error(`Invalid Audio File, type is ' ${typeof file}`);
            }
        }
    }, [description, fileList, songName]);

    const handleUploadAPI = async (finalPayload, token) => {
        setIsLoading(true);
        const response = await uploadFile(finalPayload, token);
        setIsLoading(false);
        console.log(response);
    };

    function handleClearData() {
        // clear inputs + clear audioFileRef.current.value (clear shortPreview when it's null)
        // + clear inputFile (can re-choose prevFile again)
        // + clear class 'invalid' in songDetailsRef.current
        setSongName('');
        setDescription('');
        setAudioFile(null); // clear preview if check by state
        coverImgRef.current.value = null; // clear value input to re-choose prevFile
        delete coverImgRef.current.file; // delete key
        audioFileRef.current.value = null; // clear value input to re-choose prevFile
        delete audioFileRef.current.file; // delete key & clear preview if check by .file
        songDetailsRef.current.classList.remove(styles.invalid); // clear style invalid
    }

    // onClick close FileItem: remove FileItem from Preview List
    const handleRemoveFileFromPreview = useCallback(
        (file) => {
            const newFileList = [...fileList];
            newFileList.splice(fileList.indexOf(file), 1); // or passing index instead of element
            setFileList(newFileList);
        },
        [fileList],
    );

    // onFileChange(fileList); // show list file

    return (
        <div className={cx('wrapper')}>
            {/* Drop & Info */}
            <div className={cx('upload-area')}>
                {/* Drop & shortPreview */}
                <div className={cx('left-part')}>
                    {/* Drop */}
                    <div
                        className={cx('drop-area')}
                        ref={dropAreaRef}
                        onDragEnter={addStyleDragOver}
                        onDragLeave={removeStyleDragOver}
                        onDrop={removeStyleDragOver}
                    >
                        <img src={uploadImages.cloudUpload} alt="" />
                        <p>Drag & Drop or Choose your files here</p>
                        <input
                            type="file"
                            id="audio-file"
                            ref={audioFileRef}
                            onChange={handleDropAudioFile}
                            accept="audio/*" // only audio
                        />
                    </div>
                    {/* ShortPreview: check audioFile?.file?.type (check audioFileRef.current.file & audioFileRef.current.file.type), some file extensions are not recognized: sql, ... -> handle after, note data is obj {audioFile: , infos: } => but not re-render => not work => use state */}
                    {/* {audioFileRef.current?.file?.type && <FileItem data={{ audioFile: audioFileRef.current.file }} />} */}
                    {audioFile?.type && <FileItem data={{ audioFile }} />}
                </div>

                {/* Info */}
                <div className={cx('song-details')} ref={songDetailsRef}>
                    <h3 className="text-2xl font-semibold max-[375px]:mb-4">The song's information</h3>
                    <button className={cx('add', isLoading && 'loading')} onClick={handleAddToPreview}>
                        Upload

                    </button>

                    <div className={cx('song-info')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="song-name" className={cx('required')}>
                                Song name
                            </label>
                            <input
                                className={cx('form-control', 'required')}
                                id="song-name"
                                type="text"
                                placeholder="Enter the name ..."
                                value={songName}
                                onChange={(e) => setSongName(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="cover">Cover Image</label>
                            <input
                                className={cx('form-control')}
                                id="cover"
                                type="file"
                                ref={coverImgRef}
                                onChange={(e) => (coverImgRef.current.file = e.target.files[0])}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                className={cx('form-control')}
                                value={description}
                                id="description"
                                rows="2"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <p className={cx('message')}>Please choose your file and fill in required fields before adding!</p>
                </div>
            </div>

            {/* Preview */}
            {fileList.length > 0 && (
                <div className={cx('preview')}>
                    <h3 className="text-2xl font-semibold">Preview to uploaded files</h3>
                    <div className={cx('preview-container')}>
                        {fileList.map((dataItem) => (
                            <FileItem
                                key={dataItem}
                                data={dataItem}
                                // handleRemove={() => handleRemoveFile(file)}
                                handleRemove={handleRemoveFileFromPreview}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropFile;

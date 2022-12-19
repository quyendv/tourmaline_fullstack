import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ModalWrapper from '../ModalWrapper';

function LoginModal() {
    const { setIsOpenLogginModal } = useSelector((state) => state.actions);
    const navigate = useNavigate();

    return (
        <ModalWrapper>
            <div className="w-[600px]">
                <span
                    className="absolute top-2.5 right-2.5 grid cursor-pointer place-content-center"
                    onClick={() => {
                        setIsOpenLogginModal(false);
                        navigate('/');
                    }}
                >
                    <AiOutlineClose size={20} />
                </span>
                <h3 className="mb-6 border-b border-gray-500 pb-1 text-center text-2xl font-bold">Required Login</h3>
                <div className="">You need to be logged in to access this feature!</div>
                <div className="mt-4 flex items-center justify-end gap-3">
                    <Link to={'/login'} className="rounded-full bg-[#3c68ef] px-4 py-1.5 first-line:cursor-pointer">
                        Go to Login
                    </Link>
                    <div
                        className="cursor-pointer rounded-full bg-[#375174] px-4 py-1.5"
                        onClick={() => {
                            setIsOpenLogginModal(false);
                            navigate('/');
                        }}
                    >
                        Cancel
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default LoginModal;

function ModalWrapper({ children }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-30 ">
            <div className="rounded-md bg-[var(--modal-bg)] p-5 text-white">{children}</div>
        </div>
    );
}

export default ModalWrapper;

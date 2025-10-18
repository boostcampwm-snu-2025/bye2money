const ActionModal = ({
    size = "m",
    title,
    confirmText,
    children,
    onConfirm,
    onClose,
}) => {
    const sizeStyles = {
        m: "w-[400px] h-[200px]",
        l: "w-[400px] h-[260px]",
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
                className={`bg-white p-6 shadow-xl border border-black ${sizeStyles[size]}`}
            >
                <h3 className="text-xl text-black h-[40px]">{title}</h3>

                <div className="text-xl text-gray-600">{children}</div>

                <div className="flex justify-end space-x-2 mt-16 h-[40px]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;

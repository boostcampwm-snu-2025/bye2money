const ActionModal = ({ title, confirmText, children, onConfirm, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <h3 className="text-xs text-gray-600">{title}</h3>

                <div className="text-xs text-gray-600">{children}</div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;

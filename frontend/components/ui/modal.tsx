interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    onClose: () => void;
    type?: 'default' | 'danger';
}

export function Modal({ isOpen, title, message, confirmText, onConfirm, onClose, type = 'default' }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-gray-900 border-2 border-purple-600 p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(147,51,234,0.3)] scale-in-95 animate-in duration-200">
                <h2 className={`text-2xl font-bold mb-4 ${type === 'danger' ? 'text-red-500' : 'text-white'}`}>
                    {title}
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                    {message}
                </p>
                <div className="flex justify-end gap-4">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`px-6 py-2 rounded-full font-bold cursor-pointer transition-all active:scale-95 ${
                            type === 'danger'
                            ? 'bg-red-600 hover:bg-red-500 text-white'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
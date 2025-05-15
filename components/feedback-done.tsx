import { LucideCheckCircle2 } from "lucide-react";
import React from "react";

interface FeedbackDoneModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackDoneModal: React.FC<FeedbackDoneModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
                <div className="flex justify-center py-4">
                    <LucideCheckCircle2 width={100} height={100} color="green"/>
                </div>
                <p className="mb-6 text-gray-600">We appreciate your input and will use it to improve our service.</p>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default FeedbackDoneModal;
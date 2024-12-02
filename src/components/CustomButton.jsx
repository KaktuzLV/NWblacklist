import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { doc, deleteDoc } from "firebase/firestore";
import { fireStoreDb } from '../firebase';


function CustomButton({ itemId, itemName, onDelete }) {

    const [ShowConfirmation, setShowConfirmation] = useState(false);

    const handleConfirm = () => {
        setShowConfirmation(false);
        handleClick(itemId);
    };

    async function handleClick(Id) {
        try {
            await deleteDoc(doc(fireStoreDb, "customForm", Id));
            onDelete();
            toast.info("Deleted!", {
                position: "bottom-right",
                theme: "dark"
            });
        } catch (error) {
            console.error("Error deleting document: ", error);
            toast.error("Failed to delete the document!", {
                position: "bottom-right",
                theme: "dark"
            });
        }
    }
    return (
        <div className="relative inline-block group">
            <button
                className="shadow bg-gray-600 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => setShowConfirmation(true)}
            >
                <FaTrashAlt />
            </button>
            {!ShowConfirmation && (
            <span className="absolute bottom-full mb-2 hidden px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-500 opacity-0 group-hover:opacity-100 group-hover:block">
                Delete
            </span>
            )}
            {ShowConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-700 p-4 rounded shadow-md">
                        <p>Do you wanna delete <span className='text-orange-500 font-bold'>{itemName}</span> from list?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-red-800 hover:bg-red-900 text-white py-1 px-3 rounded mr-2"
                                onClick={handleConfirm}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-black py-1 px-3 rounded"
                                onClick={() => setShowConfirmation(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomButton;

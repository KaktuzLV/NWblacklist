import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fireStoreDb } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

function CustomForm() {
    const collect = collection(fireStoreDb, "customForm");
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);

        try{
            await addDoc(collect, formData);
            setFormData({
                name: '',
                category: '',
                description: '',
            });
            toast.success("Submited!", {
                position: "bottom-right",
                theme: "dark"
            });
        } catch (e) {
            console.log(e)
            toast.error("Error!", {
                position: "bottom-right",
                theme: "dark"
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-6">
                <label
                    className="block text-gray-500 font-bold mb-1 pr-4"
                    htmlFor="name"
                >
                    Name
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-500 font-bold mb-1 pr-4"
                    htmlFor="category"
                >
                    Category
                </label>
                <select
                    className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select a category</option>
                    <option value="blacklist">Blacklist</option>
                    <option value="whitelist">Whitelist</option>
                </select>
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-500 font-bold mb-1 pr-4"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default CustomForm;

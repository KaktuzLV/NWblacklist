import React, { useState, useMemo } from 'react';
import CustomButton from './CustomButton';
import { FiSearch } from "react-icons/fi";

function CustomTables({ data, onReload }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 7;

    const filteredRecords = useMemo(() => {
        const searchTerm = search.toLowerCase();
        return data.filter((record) => {
            return record.name && record.name.toLowerCase().includes(searchTerm);
        });
    }, [search, data]);

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center p-2 rounded-md w-full bg-gray-800">
                <FiSearch className="h-5 w-5 text-gray-600 mr-2" />
                <input
                    type="text"
                    placeholder="Search for player..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full bg-transparent text-white border-none focus:outline-none focus:ring-0"
                />
            </div>
            {filteredRecords.length ? (
                <div>
                    <table className="table-auto w-full border-separate rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="border border-slate-800 px-4 py-2 text-left rounded-tl-lg">Name</th>
                                <th className="border border-slate-800 px-4 py-2 text-left">Description</th>
                                <th className="border border-slate-800 px-4 py-2 text-left rounded-tr-lg"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => (
                                <tr key={item.id} className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white">
                                    <td className="border border-gray-800 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-800 px-4 py-2">{item.description}</td>
                                    <td className="border border-gray-800 px-4 py-2 text-center">
                                        <CustomButton itemId={item.id} itemName={item.name} onDelete={() => { onReload() }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`rounded-md mx-1 px-3 py-1 border border-slate-800 hover:bg-gray-800 hover:text-white ${currentPage === index + 1 ? 'bg-gray-300 text-gray-800' : 'bg-gray-600 text-white'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <h1 className="text-white font-bold">This player isn't in this list!</h1>
            )}
        </div>
    );
}

export default CustomTables;

import React, { useState, useMemo } from 'react';
import { FiSearch } from "react-icons/fi";

function CustomSearch({ data }) {
    const [search, setSearch] = useState("");

    const filteredRecords = useMemo(() => {
        const searchTerm = search.toLowerCase();
        return data.filter((record) => {
            return record.name && record.name.toLowerCase().includes(searchTerm);
        });
    }, [search, data]);

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

            {search && (
                <div>
                    {filteredRecords.length ? (
                        <table className="table-auto w-full border-separate rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-600 text-white">
                                    <th className="border border-slate-800 px-4 py-2 text-left rounded-tl-lg">Name</th>
                                    <th className="border border-slate-800 px-4 py-2 text-left">Description</th>
                                    <th className="border border-slate-800 px-4 py-2 text-left rounded-tr-lg">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.map((item) => (
                                    <tr key={item.id} className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white">
                                        <td className="border border-gray-800 px-4 py-2">{item.name}</td>
                                        <td className="border border-gray-800 px-4 py-2">{item.description}</td>
                                        <td className="border border-gray-800 px-4 py-2">{item.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h1 className="text-white font-bold">No results found</h1>
                    )}
                </div>
            )}
        </div>
    );
}

export default CustomSearch;

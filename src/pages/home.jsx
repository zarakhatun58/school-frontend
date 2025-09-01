"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../lib/api";

const Home = () => {
    const [schools, setSchools] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const pageSize = 20;

    useEffect(() => {
        fetchSchools();
    }, [search, page]);

    const fetchSchools = async () => {
        try {
            const { data } = await axios.get(
                `${API_URL}/api/schools?q=${search}&page=${page}&limit=${pageSize}`
            );
            setSchools(data.schools || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error("Error fetching schools:", err);
        }
    };

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    return (
        <div className="p-4 md:p-6 overflow-y-auto">
            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search schools..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="border rounded px-3 py-2 w-full md:w-64"
                />
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                {schools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {schools.map((school) => (
                            <div
                                key={school.id}
                                className="border p-4 rounded shadow hover:shadow-md transition"
                            >
                                <img
                                    src={
                                        school.image
                                            ? `${API_URL}/schoolImages/${school.image}`
                                            : "/placeholder.png"
                                    }
                                    alt={school.name}
                                    className="w-full h-40 object-cover rounded mb-2"
                                />
                                <h2 className="font-bold text-lg">{school.name}</h2>
                                <p>
                                    {school.address}, {school.city}
                                </p>
                                <button
                                    onClick={() => setSelectedSchool(school)}
                                    className="mt-2 px-3 py-1 bg-[#1a2246] text-white rounded text-sm"
                                >
                                    More
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-4">No schools found</p>
                )}

            </div>
            {selectedSchool && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-4 flex flex-col md:flex-row">
                        {/* Left: Image */}
                        <div className="md:w-1/2 flex justify-center items-center">
                            <img
                                src={
                                    selectedSchool.image
                                        ? `${API_URL}/schoolImages/${selectedSchool.image}`
                                        : "/placeholder.png"
                                }
                                alt={selectedSchool.name}
                                className="w-full h-64 object-cover rounded"
                            />
                        </div>

                        {/* Right: Details */}
                        <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
                            <h2 className="text-2xl font-bold mb-2">
                                {selectedSchool.name}
                            </h2>
                            <p className="mb-1">
                                <strong>Address:</strong> {selectedSchool.address}
                            </p>
                            <p className="mb-1">
                                <strong>City:</strong> {selectedSchool.city}
                            </p>
                            <p className="mb-1">
                                <strong>State:</strong> {selectedSchool.state}
                            </p>
                            <p className="mb-1">
                                <strong>Contact:</strong> {selectedSchool.contact}
                            </p>
                            <p className="mb-1">
                                <strong>Email:</strong> {selectedSchool.email_id}
                            </p>
                            <button
                                onClick={() => setSelectedSchool(null)}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* <div className="flex justify-center items-center space-x-4 mt-10">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div> */}
        </div>
    );
};

export default Home;

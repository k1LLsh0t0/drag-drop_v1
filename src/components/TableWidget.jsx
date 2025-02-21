import React, { useEffect, useState } from "react";

const TableWidget = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setData(data.slice(0, 5)));
    }, []);

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user) => (
                    <tr key={user.id} className="border">
                        <td className="border p-2">{user.name}</td>
                        <td className="border p-2">{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableWidget;

import { useEffect, useState } from "react";
import API from "../../utils/api";
import SearchBar from "../../components/common/SearchBar";
import { filterData } from "../../utils/filterData";

function FineHistory() {

    const [fines, setFines] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadFines();
    }, []);

    const loadFines = async () => {
        const userId = localStorage.getItem("userId");
        const res = await API.get(`/my-fine-history/${userId}`);
        setFines(res.data);
    };

    const filteredFines = filterData(fines, search, ["title"]);

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    };

    return (

        <div className="bg-white rounded-xl shadow">

            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">

                <h2 className="text-xl font-semibold">
                    Fine Payment History
                </h2>

                <SearchBar
                    placeholder="Search book..."
                    value={search}
                    onChange={setSearch}
                />

            </div>

            <div className="h-80 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 sticky top-0">

                        <tr>
                            <th className="p-3">Book</th>
                            <th className="p-3 text-center">Fine Amount</th>
                            <th className="p-3 text-center">Paid Date</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredFines.map((fine, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">{fine.title}</td>
                                <td className="p-3 text-center text-red-600 font-semibold">₹{fine.amount}</td>
                                <td className="p-3 text-center">{formatDate(fine.paid_date)}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default FineHistory;
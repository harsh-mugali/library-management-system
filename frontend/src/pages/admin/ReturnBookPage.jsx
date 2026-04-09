import { useEffect, useState } from "react";
import API from "../../utils/api";
import { returnBook } from "../../services/bookService";
import { toast } from "react-toastify";
import SearchBar from "../../components/common/SearchBar";
import {filterData} from "../../utils/filterData";

function ReturnBookPage() {

    const [issuedBooks, setIssuedBooks] = useState([]);

    useEffect(() => {
        fetchIssuedBooks();
    }, []);

    const fetchIssuedBooks = async () => {

        const res = await API.get("/issued-books");

        setIssuedBooks(res.data);

    };

    const handleReturn = async (id) => {

        await returnBook(id);

        toast.success("Book returned successfully");

        fetchIssuedBooks();

    };

    const [search, setSearch] = useState("");

    const filteredBooks=filterData(issuedBooks,search,["title","user"]);

    return (

        <div className="bg-white rounded-xl shadow">

            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">

                <h2 className="text-xl font-semibold">
                    Return Books
                </h2>

                <SearchBar
                    placeholder="Search books..."
                    value={search}
                    onChange={setSearch}
                />

            </div>

            <div className="h-80 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="p-3">Book</th>
                            <th className="p-3 text-center">User</th>
                            <th className="p-3 text-center">Issue Date</th>
                            <th className="p-3 text-center">Due Date</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredBooks.map((book) => (

                            <tr key={book.id} className="border-b">

                                <td className="p-3">{book.title}</td>
                                <td className="p-3 text-center">{book.user}</td>
                                <td className="p-3 text-center">{new Date(book.issue_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                                <td className="p-3 text-center">{new Date(book.due_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>

                                <td className="p-3 text-center">

                                    <button
                                        onClick={() => handleReturn(book.id)}
                                        className="bg-green-600 text-white px-4 py-1 rounded"
                                    >
                                        Return
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </div>

    );

}

export default ReturnBookPage;
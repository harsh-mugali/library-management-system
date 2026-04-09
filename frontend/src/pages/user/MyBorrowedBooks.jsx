import { useEffect, useState } from "react";
import { getMyBooks } from "../../services/userService";
import SearchBar from "../../components/common/SearchBar";
import {filterData} from "../../utils/filterData";  

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

function MyBorrowedBooks() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    const userId = localStorage.getItem("userId");

    useEffect(() => { loadBooks(); }, []);

    const loadBooks = async () => {
        const userId = localStorage.getItem("userId");
        const data = await getMyBooks(userId);
        setBooks(data);
    };

    const filteredBooks=filterData(books,search,["title"]);

    return (
        <div className="bg-white rounded-xl shadow">

            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">

                <h2 className="text-xl font-semibold">
                    My Borrowed Books
                </h2>

                <SearchBar
                    placeholder="Search books..."
                    value={search}
                    onChange={setSearch}
                />

            </div>

            <div className="h-72 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="p-3">Book</th>
                            <th className="p-3 text-center">Issue Date</th>
                            <th className="p-3 text-center">Due Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredBooks.map(book => (
                            <tr key={book.id} className="border-b">
                                <td className="p-3">{book.title}</td>
                                <td className="p-3 text-center">{formatDate(book.issue_date)}</td>
                                <td className="p-3 text-center">{formatDate(book.due_date)}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}
export default MyBorrowedBooks;
import { useEffect, useState } from "react";
import { getBooks, assignBook } from "../../services/bookService";
import API from "../../utils/api";
import { toast } from "react-toastify";

function AssignBookPage() {

    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);

    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const booksData = await getBooks();
        setBooks(booksData);

        const usersRes = await API.get("/users");
        setUsers(usersRes.data);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!bookId || !userId || !issueDate || !dueDate) {

            toast.error("All fields are required");
            return;

        }

        await assignBook({
            book_id: bookId,
            user_id: userId,
            issue_date: issueDate,
            due_date: dueDate
        });

        toast.success("Book assigned successfully");

        setBookId("");
        setUserId("");
        setIssueDate("");
        setDueDate("");

    };

    return (

        <div className="flex justify-center items-center min-h-[80vh]">

            <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-2xl">

                <h2 className="text-2xl font-bold mb-8 text-center">
                    Assign Book
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                    {/* Book */}

                    <select
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        className="p-3 border rounded"
                    >
                        <option value="">Select Book</option>

                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title}
                            </option>
                        ))}

                    </select>


                    {/* User */}

                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="p-3 border rounded"
                    >
                        <option value="">Select User</option>

                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}

                    </select>


                    {/* Issue Date */}

                    <div>
                        <label className="text-gray-600 text-sm">
                            Issue Date
                        </label>

                        <input
                            type="date"
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />

                    </div>


                    {/* Due Date */}

                    <div>
                        <label className="text-gray-600 text-sm">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />

                    </div>


                    <div className="col-span-2 flex justify-center">

                        <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700">
                            Assign Book
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AssignBookPage;